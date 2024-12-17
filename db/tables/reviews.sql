CREATE TABLE public.reviews (
	id serial NOT NULL,
	job_id int NOT NULL,
	score int NOT NULL,
	"comment" varchar NULL,
	CONSTRAINT reviews_pk PRIMARY KEY (id),
	CONSTRAINT reviews_jobs_fk FOREIGN KEY (job_id) REFERENCES public.jobs(id);
);
