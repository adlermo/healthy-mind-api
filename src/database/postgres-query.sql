-- Query de criação das tabelas na base

create sequence therapists_sequence start 1 increment 1;

create table therapists (
    id_therapist serial primary key,
	name varchar not null,
    email varchar not null,
    passw varchar not null,
    method varchar,
    crp varchar(12),
    phone varchar(11)
);

create sequence patients_sequence start 1 increment 1;

create type _gender as enum ('masculino', 'feminino', 'prefiro não responder');

create table patients (
	id_patient serial primary key,
    email varchar unique not null,
    name varchar not null,
    cpf varchar(11) not null,
    gender _gender,
    birth date
);

create sequence sessions_sequence start 1 increment 1;

create type _status as enum ('agendado', 'finalizado', 'cancelado');

create table sessions (
	id_session serial primary key,
    therapist_id integer references therapists (id_therapist) not null,
    scheduled_time date not null,
    status _status not null,
    subject varchar not null,
    scheduling_type varchar,
    duration_time time not null,
    private_session boolean not null
);

create sequence patients_session_sequence start 1 increment 1;

create table patients_session (
    id serial primary key,
    patient_id integer references patients (id_patient) not null,
    session_id integer references sessions (id_session) not null
);

-- Query de inserção dados de teste na base

/*
insert into therapists values (0, 'Adler', 'Comportamental', 'AnyCRP', '67999198409');

*/

-- Query limpeza das tabelas na base

drop sequence therapists_sequence;
drop table therapists;

drop sequence patients_sequence;
drop table patients;

drop sequence sessions_sequence;
drop table sessions;

drop sequence patients_session_sequence;
drop table patients_session;
