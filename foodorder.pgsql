--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: foodorders_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.foodorders_status_enum AS ENUM (
    'open',
    'preparation',
    'prepared',
    'delivery',
    'closed',
    'rejected'
);


ALTER TYPE public.foodorders_status_enum OWNER TO postgres;

--
-- Name: users_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_status_enum AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.users_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food (
    id integer NOT NULL,
    name character varying NOT NULL,
    "lotNumber" integer NOT NULL,
    price integer,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    cuisine character varying NOT NULL,
    ingredients text NOT NULL,
    productioncost integer NOT NULL,
    status character varying
);


ALTER TABLE public.food OWNER TO postgres;

--
-- Name: food_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.food_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.food_id_seq OWNER TO postgres;

--
-- Name: food_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.food_id_seq OWNED BY public.food.id;


--
-- Name: foodorders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foodorders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    items text NOT NULL,
    totalcost integer,
    status public.foodorders_status_enum DEFAULT 'open'::public.foodorders_status_enum NOT NULL,
    "orderDate" timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    dateofdelivery timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    modeoftansport character varying NOT NULL,
    created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    "userId" integer
);


ALTER TABLE public.foodorders OWNER TO postgres;

--
-- Name: foodorders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.foodorders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.foodorders_id_seq OWNER TO postgres;

--
-- Name: foodorders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.foodorders_id_seq OWNED BY public.foodorders.id;


--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredients (
    id integer NOT NULL,
    name character varying NOT NULL,
    "lotNumber" integer NOT NULL,
    availablequantity integer NOT NULL,
    "thresholdQuantity" integer NOT NULL,
    price integer,
    vendorname character varying NOT NULL,
    vendoremail character varying,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL
);


ALTER TABLE public.ingredients OWNER TO postgres;

--
-- Name: ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredients_id_seq OWNER TO postgres;

--
-- Name: ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    status public.users_status_enum DEFAULT 'active'::public.users_status_enum NOT NULL,
    "lastLoginAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP(6) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: food id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food ALTER COLUMN id SET DEFAULT nextval('public.food_id_seq'::regclass);


--
-- Name: foodorders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foodorders ALTER COLUMN id SET DEFAULT nextval('public.foodorders_id_seq'::regclass);


--
-- Name: ingredients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: food; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.food (id, name, "lotNumber", price, "createdAt", cuisine, ingredients, productioncost, status) FROM stdin;
1	cake	1	15	2020-05-17 20:38:23.887	western	flour,egg,milk	10	string
2	donut	1	15	2020-05-17 20:38:23.887	western	flour,egg,milk	10	string
3	pawbaji	1	15	2020-05-17 20:38:23.887	indian	flour,egg,milk	10	string
4	venilla icereme	1	80	2020-05-17 20:38:23.887	indian	water,,colour	100	string
5	buttur icecreme	1	230	2020-05-17 20:38:23.887	indian	water,,colour	300	string
\.


--
-- Data for Name: foodorders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foodorders (id, user_id, items, totalcost, status, "orderDate", dateofdelivery, modeoftansport, created_on, "userId") FROM stdin;
2	1	cake	0	open	2020-05-17 20:23:03.314	2020-05-17 20:23:03.314	string	2020-05-17 20:23:03.314	\N
3	1	{'name': 'cake', 'qua': '2'}	0	open	2020-05-17 20:23:03.314	2020-05-17 20:23:03.314	string	2020-05-17 20:23:03.314	\N
4	1	{'name': 'cake', 'qua': '2'},{'name': 'donut', 'qua': '2'}	0	open	2020-05-17 20:23:03.314	2020-05-17 20:23:03.314	string	2020-05-17 20:23:03.314	\N
5	1	{'name': 'cake', 'qua': '2'},{'name': 'donut', 'qua': '2'}	0	open	2020-05-17 20:23:03.314	2020-05-17 20:23:03.314	string	2020-05-17 20:23:03.314	\N
6	3	{'name': 'cake', 'qua': '2'},{'name': 'donut', 'qua': '2'}	0	open	2020-05-17 20:23:03.314	2020-05-17 20:23:03.314	string	2020-05-17 20:23:03.314	\N
7	3	{'name': 'cake', 'qua': '2'},{'name': 'donut', 'qua': '2'}	0	open	2020-05-17 20:23:03.314	2020-05-17 20:23:03.314	string	2020-05-17 20:23:03.314	\N
8	3	{'name': 'cake', 'qua': '2'},{'name': 'donut', 'qua': '2'}	0	open	2020-05-17 20:23:03.314	2020-05-17 20:23:03.314	string	2020-05-17 20:23:03.314	\N
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredients (id, name, "lotNumber", availablequantity, "thresholdQuantity", price, vendorname, vendoremail, "createdAt") FROM stdin;
1	flour	10	10	5	100	mohan	mohan@gg.com	2020-05-17 21:10:24.575
3	butter	10	10	5	100	greeta	greeta@gg.com	2020-05-17 21:10:24.575
6	oil	10	10	5	100	gree	mohan@gg.com	2020-05-17 21:10:24.575
7	water	10	10	5	100	gree	gree@gg.com	2020-05-17 21:10:24.575
8	creme	10	10	5	100	gree	gree@gg.com	2020-05-17 21:10:24.575
9	egg	10	10	15	100	gree	gree@gg.com	2020-05-17 21:10:24.575
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1589721419571	myinit1589721419571
2	1589721648999	myinit1589721648999
3	1589723870992	addreations1589723870992
4	1589725975156	changeEnumUser1589725975156
5	1589730241313	removeUniqueVendornam1589730241313
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, firstname, lastname, email, password, status, "lastLoginAt", "createdAt", "updatedAt") FROM stdin;
2	lami	pra	lami@gg.com	$2b$10$tbOdQr6ZxEr0h3NePu2cCO5y1CKMyk9pR42E2BYxzjWTxVIrGepXq	active	2020-05-17 19:35:43.678215	2020-05-17 19:14:25.293	2020-05-17 19:35:43.678215
3	moh	pra	moh@gg.com	$2b$10$nzZUFjGrGA.g2e.eyOYH4uqAfpsJkwZtTmdxLS22jzaxll5ePol4a	active	2020-05-17 19:35:58.676548	2020-05-17 19:14:25.293	2020-05-17 19:35:58.676548
4	gree	pra	gree@gg.com	$2b$10$QI7K4ccvM2WUEVq9Z1Ek7O75NraDduQxlpk7IW3mB9/PtUS8jxXYa	active	2020-05-17 19:36:09.807002	2020-05-17 19:14:25.293	2020-05-17 19:36:09.807002
1	hidi	gree	hidi@gg.com	$2b$10$sT5/ri9QqnrNqEuNzpaVzuMQtEtsd8YtBNq2UG/.IgTixP1huSi76	inactive	2020-05-17 19:34:32.787937	2020-05-17 19:14:25.293	2020-05-17 19:56:28.119
\.


--
-- Name: food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.food_id_seq', 10, true);


--
-- Name: foodorders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.foodorders_id_seq', 8, true);


--
-- Name: ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredients_id_seq', 9, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: foodorders PK_2570bb37c510fbbc4da0cbcc3fc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foodorders
    ADD CONSTRAINT "PK_2570bb37c510fbbc4da0cbcc3fc" PRIMARY KEY (id);


--
-- Name: food PK_26d12de4b6576ff08d30c281837; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food
    ADD CONSTRAINT "PK_26d12de4b6576ff08d30c281837" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: ingredients PK_9240185c8a5507251c9f15e0649; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: food UQ_0f9580637d3bcdd0c9d6558de0d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food
    ADD CONSTRAINT "UQ_0f9580637d3bcdd0c9d6558de0d" UNIQUE (name);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: ingredients UQ_a955029b22ff66ae9fef2e161f8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT "UQ_a955029b22ff66ae9fef2e161f8" UNIQUE (name);


--
-- Name: foodorders FK_4d21b98738d758ee4032e169085; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foodorders
    ADD CONSTRAINT "FK_4d21b98738d758ee4032e169085" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

