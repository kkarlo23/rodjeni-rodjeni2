export function getNotifications(repository) {
  return async (req, res) => {
    const { session } = req;

    const notifications = await repository.notifications.getUserNotifications(session.user_id);
    res.send(notifications);
  };
}
