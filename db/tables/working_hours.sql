CREATE TABLE public.working_hours (
	id serial NOT NULL,
	job_id int NOT NULL,
	"day" int NOT NULL,
	"hour" int NOT NULL, 
	available boolean DEFAULT false NOT NULL,
	emergency boolean DEFAULT false NOT NULL,
	CONSTRAINT working_hours_pk PRIMARY KEY (id),
	CONSTRAINT working_hours_jobs_fk FOREIGN KEY (job_id) REFERENCES public.jobs(id);
);
