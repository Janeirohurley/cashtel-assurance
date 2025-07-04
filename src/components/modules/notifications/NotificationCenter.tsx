import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, Filter, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { notificationService } from '../../../services/notificationService';
import { AppNotification, NotificationType } from '../../../types/notification';

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  useEffect(() => {
    loadNotifications();
    notificationService.addListener(handleNewNotification);

    return () => {
      notificationService.removeListener(handleNewNotification);
    };
  }, []);

  const loadNotifications = async () => {
    await notificationService.loadNotifications();
    setNotifications(notificationService.getAllNotifications());
  };

  const handleNewNotification = (notification: AppNotification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    await notificationService.markAsRead(notificationId);
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = async (notificationId: string) => {
    await notificationService.deleteNotification(notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleClearAll = async () => {
    await notificationService.clearAllNotifications();
    setNotifications([]);
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;

    if (filter !== 'all') {
      filtered = filtered.filter(n => n.type === filter);
    }

    if (showUnreadOnly) {
      filtered = filtered.filter(n => !n.isRead);
    }

    return filtered;
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.CLAIM_UPDATE:
        return '📋';
      case NotificationType.PAYMENT_REMINDER:
        return '💳';
      case NotificationType.POLICY_RENEWAL:
        return '🔄';
      case NotificationType.SECURITY:
        return '🔒';
      case NotificationType.PROMOTIONAL:
        return '🎉';
      case NotificationType.SUCCESS:
        return '✅';
      case NotificationType.WARNING:
        return '⚠️';
      case NotificationType.ERROR:
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  const getNotificationVariant = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return 'success';
      case NotificationType.WARNING:
        return 'warning';
      case NotificationType.ERROR:
        return 'error';
      case NotificationType.SECURITY:
        return 'error';
      default:
        return 'info';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-dark-500 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h2>
          {unreadCount > 0 && (
            <Badge variant="error" size="sm">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleMarkAllAsRead}
            variant="outline"
            size="sm"
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
          <Button
            onClick={handleClearAll}
            variant="outline"
            size="sm"
            icon={Trash2}
            disabled={notifications.length === 0}
          >
            Clear All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-dark-500 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
            >
              All
            </Button>
            {Object.values(NotificationType).map((type) => (
              <Button
                key={type}
                onClick={() => setFilter(type)}
                variant={filter === type ? 'primary' : 'outline'}
                size="sm"
              >
                {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}
              </Button>
            ))}
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="rounded border-light-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-dark-500">Show unread only</span>
          </label>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Bell className="w-12 h-12 text-dark-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-dark-500 mb-2">No Notifications</h3>
              <p className="text-dark-400">
                {showUnreadOnly ? 'No unread notifications' : 'You\'re all caught up!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all duration-200 ${
                !notification.isRead ? 'border-l-4 border-l-primary-500 bg-primary-50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="text-2xl">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-dark-500">{notification.title}</h4>
                        <Badge variant={getNotificationVariant(notification.type)} size="sm">
                          {notification.type}
                        </Badge>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-dark-400 mb-2">{notification.message}</p>
                      <div className="text-xs text-dark-400">
                        {formatTime(notification.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {!notification.isRead && (
                      <Button
                        onClick={() => handleMarkAsRead(notification.id)}
                        variant="ghost"
                        size="sm"
                        icon={Check}
                        className="text-success-600 hover:text-success-700"
                      />
                    )}
                    <Button
                      onClick={() => handleDelete(notification.id)}
                      variant="ghost"
                      size="sm"
                      icon={X}
                      className="text-error-600 hover:text-error-700"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};