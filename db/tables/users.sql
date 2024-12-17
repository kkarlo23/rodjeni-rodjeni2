CREATE TABLE public.users (
	id serial NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	full_name varchar NOT NULL,
	email varchar NOT NULL,
	phone varchar NOT NULL,
	"role" varchar DEFAULT 'basic' NOT NULL,
	deleted boolean DEFAULT false NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_unique UNIQUE (username);
);