CREATE TABLE public.municipalities (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	county_id int NOT NULL,
	CONSTRAINT municipalities_pk PRIMARY KEY (id),
	CONSTRAINT municipalities_counties_fk FOREIGN KEY (county_id) REFERENCES public.counties(id);
);
