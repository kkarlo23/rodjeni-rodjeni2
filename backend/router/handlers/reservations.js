import Joi from "joi";

export const createReservationSchema = Joi.object({
  working_hour_id: Joi.number().integer().positive().required(),
  date: Joi.date().required(),
});

export function createReservation(repository) {
  return async (req, res) => {
    const { session, body } = req;
    const { userId } = session;

    await repository.reservations.createReservation({ user_id: userId, working_hour_id: body.working_hour_id, date: body.date });

    // TODO: create notification

    return res.sendStatus(200);
  };
}

export function updateReservationStatus(repository, accepted) {
  return async (req, res) => {
    const { reservationId } = req.params;

    const reservation = await repository.reservations.updateReservationStatus({ reservationId, accepted });
    if (!reservation) return res.sendStatus(202);

    // TODO: create notification

    return res.sendStatus(200);
  };
}

export function completeReservation(repository) {
  return async (req, res) => {
    const { reservationId } = req.params;

    const reservation = await repository.reservations.completeReservation({ reservationId });
    if (!reservation) return res.sendStatus(202);

    // TODO: create notification

    return res.sendStatus(200);
  };
}
