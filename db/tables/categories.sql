CREATE TABLE public.categories (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT categories_pk PRIMARY KEY (id),
	CONSTRAINT categories_unique UNIQUE ("name");
);
