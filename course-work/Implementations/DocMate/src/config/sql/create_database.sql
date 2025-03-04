use master
DROP database DocMate;

create database DocMate;
Go
use DocMate
go

CREATE TABLE Clients (
	client_id INT IDENTITY(1,1) PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	phone VARCHAR(15) NOT NULL,
	age INT NOT NULL,
	registration_date DATETIME NOT NULL DEFAULT GETDATE(),
	is_active BIT NOT NULL DEFAULT 1
)

CREATE TABLE Doctors (
	doctor_id INT IDENTITY(1,1) PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	specialization VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	phone VARCHAR(15) NOT NULL,
	years_of_exp INT NOT NULL,
	hire_date DATETIME NOT NULL DEFAULT GETDATE(),
	rating FLOAT NOT NULL DEFAULT 0
)

CREATE TABLE Appointments (
	appointment_id INT IDENTITY(1,1) PRIMARY KEY,
	client_id INT NOT NULL,
	doctor_id INT NOT NULL,
	[date] DATETIME NOT NULL,
	reason VARCHAR(255) NOT NULL,
	fee FLOAT NOT NULL,
	[status] VARCHAR(50) NOT NULL DEFAULT 'scheduled',
	CONSTRAINT FK_Client FOREIGN KEY (client_id) REFERENCES Clients(client_id),
	CONSTRAINT FK_Doctor FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id)
)