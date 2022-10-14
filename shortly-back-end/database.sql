CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE DEFAULT 'serial',
	"email" TEXT NOT NULL UNIQUE DEFAULT 'serial',
	"password" TEXT NOT NULL UNIQUE DEFAULT 'serial',
	"createAt" TIME NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL UNIQUE,
	"userId" serial NOT NULL UNIQUE,
	"token" serial NOT NULL UNIQUE,
	"createAt" DATE NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "urls" (
	"id" serial NOT NULL UNIQUE,
	"url" TEXT NOT NULL,
	"shortenURL" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"createAt" TIME NOT NULL,
	"visitCount" integer NOT NULL,
	CONSTRAINT "url_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "url" ADD CONSTRAINT "url_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");



