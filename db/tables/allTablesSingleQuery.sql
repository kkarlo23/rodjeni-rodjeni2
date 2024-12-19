-- public.categories definition

-- Drop table

-- DROP TABLE public.categories;

CREATE TABLE public.categories (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT categories_pk PRIMARY KEY (id),
	CONSTRAINT categories_unique UNIQUE (name)
);


-- public.counties definition

-- Drop table

-- DROP TABLE public.counties;

CREATE TABLE public.counties (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT counties_pk PRIMARY KEY (id),
	CONSTRAINT counties_unique UNIQUE (name)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	full_name varchar NOT NULL,
	email varchar NOT NULL,
	phone varchar NOT NULL,
	"role" varchar DEFAULT 'basic'::character varying NOT NULL,
	deleted bool DEFAULT false NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_unique UNIQUE (username)
);


-- public.municipalities definition

-- Drop table

-- DROP TABLE public.municipalities;

CREATE TABLE public.municipalities (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	county_id int4 NOT NULL,
	CONSTRAINT municipalities_pk PRIMARY KEY (id),
	CONSTRAINT municipalities_counties_fk FOREIGN KEY (county_id) REFERENCES public.counties(id)
);


-- public.notifications definition

-- Drop table

-- DROP TABLE public.notifications;

CREATE TABLE public.notifications (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	"content" varchar NOT NULL,
	"read" bool DEFAULT false NOT NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	CONSTRAINT notifications_pk PRIMARY KEY (id),
	CONSTRAINT notifications_users_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);


-- public.sessions definition

-- Drop table

-- DROP TABLE public.sessions;

CREATE TABLE public.sessions (
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id int4 NOT NULL,
	expires_at timestamp NOT NULL,
	CONSTRAINT sessions_pk PRIMARY KEY (uuid),
	CONSTRAINT sessions_users_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);


-- public.jobs definition

-- Drop table

-- DROP TABLE public.jobs;

CREATE TABLE public.jobs (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	category_id int4 NOT NULL,
	municipality_id int4 NOT NULL,
	description varchar NOT NULL,
	CONSTRAINT jobs_pk PRIMARY KEY (id),
	CONSTRAINT jobs_categories_fk FOREIGN KEY (category_id) REFERENCES public.categories(id),
	CONSTRAINT jobs_municipalities_fk FOREIGN KEY (municipality_id) REFERENCES public.municipalities(id),
	CONSTRAINT jobs_users_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);


-- public.reviews definition

-- Drop table

-- DROP TABLE public.reviews;

CREATE TABLE public.reviews (
	id serial4 NOT NULL,
	job_id int4 NOT NULL,
	score int4 NOT NULL,
	"comment" varchar NULL,
	CONSTRAINT reviews_pk PRIMARY KEY (id),
	CONSTRAINT reviews_jobs_fk FOREIGN KEY (job_id) REFERENCES public.jobs(id)
);


-- public.working_hours definition

-- Drop table

-- DROP TABLE public.working_hours;

CREATE TABLE public.working_hours (
	id serial4 NOT NULL,
	job_id int4 NOT NULL,
	emergency bool DEFAULT false NOT NULL,
	"day" int4 NOT NULL,
	"hour" int4 NOT NULL,
	available bool DEFAULT false NOT NULL,
	CONSTRAINT working_hours_pk PRIMARY KEY (id),
	CONSTRAINT working_hours_jobs_fk FOREIGN KEY (job_id) REFERENCES public.jobs(id)
);


-- public.reservations definition

-- Drop table

-- DROP TABLE public.reservations;

CREATE TABLE public.reservations (
	id serial4 NOT NULL,
	working_hour_id int4 NOT NULL,
	"date" date NOT NULL,
	user_id int4 NOT NULL,
	accepted bool DEFAULT false NOT NULL,
	completed bool DEFAULT false NOT NULL,
	CONSTRAINT reservations_pk PRIMARY KEY (id),
	CONSTRAINT reservations_users_fk FOREIGN KEY (user_id) REFERENCES public.users(id),
	CONSTRAINT reservations_working_hours_fk FOREIGN KEY (working_hour_id) REFERENCES public.working_hours(id)
);