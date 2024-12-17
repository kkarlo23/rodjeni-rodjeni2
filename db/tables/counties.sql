CREATE TABLE public.counties (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT counties_pk PRIMARY KEY (id),
	CONSTRAINT counties_unique UNIQUE ("name");
);
