CREATE TABLE public.notifications (
	id serial NOT NULL,
	user_id int NOT NULL,
	"content" varchar NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	created_at timestamp without time zone DEFAULT NOW() NOT NULL,
	CONSTRAINT notifications_pk PRIMARY KEY (id),
	CONSTRAINT notifications_users_fk FOREIGN KEY (user_id) REFERENCES public.users(id);
);
