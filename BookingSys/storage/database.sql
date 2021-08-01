create TABLE person(
    person_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

create TABLE product(
    p_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10,2)
);

create TABLE rtable(
    rtable_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    seats_am INT
);

create TABLE reserve(
    reserve_id SERIAL PRIMARY KEY,
    p_id INT,
    FOREIGN KEY (p_id) REFERENCES person (person_id),
    rt_id INT,
    FOREIGN KEY (rt_id) REFERENCES rtable (rtable_id),
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    orders INT[]
)
