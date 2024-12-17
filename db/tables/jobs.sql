CREATE TABLE public.jobs (
	id serial NOT NULL,
	description varchar NOT NULL,
	user_id int NOT NULL,
	category_id int NOT NULL,
	municipality_id int NOT NULL,
	CONSTRAINT jobs_pk PRIMARY KEY (id),
	CONSTRAINT jobs_users_fk FOREIGN KEY (user_id) REFERENCES public.users(id),
	CONSTRAINT jobs_categories_fk FOREIGN KEY (category_id) REFERENCES public.categories(id),
	CONSTRAINT jobs_municipalities_fk FOREIGN KEY (municipality_id) REFERENCES public.municipalities(id);
);
