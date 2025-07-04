import { AppNotification, NotificationType } from '../types/notification';

class NotificationService {
  private static instance: NotificationService;
  private notifications: AppNotification[] = [];
  private listeners: ((notification: AppNotification) => void)[] = [];

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  addListener(listener: (notification: AppNotification) => void): void {
    this.listeners.push(listener);
  }

  removeListener(listener: (notification: AppNotification) => void): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  async sendNotification(params: {
    title: string;
    message: string;
    type?: NotificationType;
    data?: Record<string, any>;
    autoHide?: number; // milliseconds
  }): Promise<void> {
    const notification: AppNotification = {
      id: Date.now().toString(),
      title: params.title,
      message: params.message,
      type: params.type || NotificationType.INFO,
      timestamp: new Date(),
      isRead: false,
      data: params.data
    };

    this.notifications.unshift(notification);
    await this.saveNotifications();

    // Notify listeners
    this.listeners.forEach(listener => listener(notification));

    // Auto-hide if duration is specified
    if (params.autoHide) {
      setTimeout(() => {
        this.deleteNotification(notification.id);
      }, params.autoHide);
    }
  }

  showToast(params: {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
  }): void {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white max-w-sm ${
      params.type === 'success' ? 'bg-success-600' :
      params.type === 'error' ? 'bg-error-600' :
      params.type === 'warning' ? 'bg-warning-600' :
      'bg-primary-600'
    }`;
    toast.textContent = params.message;

    document.body.appendChild(toast);

    // Remove after duration
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, params.duration || 3000);
  }

  async sendClaimStatusNotification(params: {
    claimId: string;
    status: string;
    message: string;
  }): Promise<void> {
    await this.sendNotification({
      title: 'Claim Update',
      message: params.message,
      type: NotificationType.CLAIM_UPDATE,
      data: {
        claimId: params.claimId,
        status: params.status,
        action: 'view_claim_details'
      }
    });
  }

  async sendPaymentReminder(params: {
    policyId: string;
    policyType: string;
    amount: number;
    dueDate: Date;
  }): Promise<void> {
    const daysUntilDue = Math.ceil((params.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    let message: string;

    if (daysUntilDue <= 0) {
      message = `Your ${params.policyType} premium of $${params.amount.toFixed(2)} is overdue.`;
    } else if (daysUntilDue <= 3) {
      message = `Your ${params.policyType} premium of $${params.amount.toFixed(2)} is due in ${daysUntilDue} days.`;
    } else {
      message = `Your ${params.policyType} premium of $${params.amount.toFixed(2)} is due on ${this.formatDate(params.dueDate)}.`;
    }

    await this.sendNotification({
      title: 'Payment Reminder',
      message,
      type: NotificationType.PAYMENT_REMINDER,
      data: {
        policyId: params.policyId,
        policyType: params.policyType,
        amount: params.amount,
        dueDate: params.dueDate.toISOString(),
        action: 'make_payment'
      }
    });
  }

  async sendPolicyRenewalNotification(params: {
    policyId: string;
    policyType: string;
    renewalDate: Date;
  }): Promise<void> {
    const daysUntilRenewal = Math.ceil((params.renewalDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    let message: string;

    if (daysUntilRenewal <= 30) {
      message = `Your ${params.policyType} policy expires in ${daysUntilRenewal} days. Renew now to avoid coverage gaps.`;
    } else {
      message = `Your ${params.policyType} policy renewal is due on ${this.formatDate(params.renewalDate)}.`;
    }

    await this.sendNotification({
      title: 'Policy Renewal',
      message,
      type: NotificationType.POLICY_RENEWAL,
      data: {
        policyId: params.policyId,
        policyType: params.policyType,
        renewalDate: params.renewalDate.toISOString(),
        action: 'renew_policy'
      }
    });
  }

  async sendSecurityAlert(params: {
    alertType: string;
    message: string;
    additionalData?: Record<string, any>;
  }): Promise<void> {
    await this.sendNotification({
      title: 'Security Alert',
      message: params.message,
      type: NotificationType.SECURITY,
      data: {
        alertType: params.alertType,
        timestamp: new Date().toISOString(),
        ...params.additionalData
      }
    });
  }

  getAllNotifications(): AppNotification[] {
    return [...this.notifications];
  }

  getUnreadNotifications(): AppNotification[] {
    return this.notifications.filter(n => !n.isRead);
  }

  getNotificationsByType(type: NotificationType): AppNotification[] {
    return this.notifications.filter(n => n.type === type);
  }

  async markAsRead(notificationId: string): Promise<void> {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      this.notifications[index] = { ...this.notifications[index], isRead: true };
      await this.saveNotifications();
    }
  }

  async markAllAsRead(): Promise<void> {
    this.notifications = this.notifications.map(n => ({ ...n, isRead: true }));
    await this.saveNotifications();
  }

  async deleteNotification(notificationId: string): Promise<void> {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    await this.saveNotifications();
  }

  async clearAllNotifications(): Promise<void> {
    this.notifications = [];
    await this.saveNotifications();
  }

  getNotificationCount(): number {
    return this.notifications.length;
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  private async saveNotifications(): Promise<void> {
    try {
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }

  async loadNotifications(): Promise<void> {
    try {
      const notificationsString = localStorage.getItem('notifications');
      if (notificationsString) {
        this.notifications = JSON.parse(notificationsString);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }

  private formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}

export const notificationService = NotificationService.getInstance();