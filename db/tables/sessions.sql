CREATE TABLE public.sessions (
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id int NOT NULL,
	expires_at timestamp without time zone NOT NULL,
	CONSTRAINT sessions_pk PRIMARY KEY ("uuid"),
	CONSTRAINT sessions_users_fk FOREIGN KEY (user_id) REFERENCES public.users(id);
);
