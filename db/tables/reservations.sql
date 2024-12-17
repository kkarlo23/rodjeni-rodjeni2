CREATE TABLE public.reservations (
	id serial NOT NULL,
	user_id int NOT NULL,
	working_hour_id int NOT NULL,
	"date" date NOT NULL,
	CONSTRAINT reservations_pk PRIMARY KEY (id),
	CONSTRAINT reservations_working_hours_fk FOREIGN KEY (working_hour_id) REFERENCES public.working_hours(id),
	CONSTRAINT reservations_users_fk FOREIGN KEY (user_id) REFERENCES public.users(id);
);

