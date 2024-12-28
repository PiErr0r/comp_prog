# 5784

## 0

ANSWER: 5777

- download `noahs-csv.zip` file
- unzip the file
- the task asks you to provide the password which is the year 2017 in hebrew calendar

## 1

ANSWER: 826-636-2286

- open `noahs_customers` in postgresql
- run the following script to find the inspector:
```
select * from
(select customerid, last_name, translate(last_name, 'abcdefghijklmnopqrstuvwxyz', '2223334445556667777888999') as mob, phone from
(
	select  customerid, lower(last_name) as last_name, length(last_name) as len, replace(phone, '-', '') as phone from
		(
			select customerid, split_part(name, ' ', -1) as last_name, phone
			from noahs_customers nc
		)
	where	
		last_name != '' and
		last_name != 'Jr.' and
		last_name != 'I' and
		last_name != 'II' and
		last_name != 'III' and
		last_name != 'IV' and
		last_name != 'V'
) where len = 10--where mob == phone
--as tmp
) where mob = phone

```

## 2

ANSWER: 332-274-4185

- open all other csvs in postgresql
- run:
```
select tmp3.*, np.desc from (
select tmp2.*, noi.sku from (
select tmp.*, no2.orderid, no2.ordered from (
select customerid, name from (
	select
		customerid
		, name
		, split_part(name, ' ', 1) as fname
		, split_part(name, ' ', 2) as lname
	from noahs_customers nc
)
where substr(fname, 1, 1) = 'J' and substr(lname, 1, 1) = 'P'
) as tmp
left join noahs_orders no2
on tmp.customerid = no2.customerid
where substr(ordered, 1, 4) = '2017'
) as tmp2
left join noahs_orders_items noi
on noi.orderid = tmp2.orderid
) as tmp3
left join noahs_products np
on np.sku = tmp3.sku
where np.desc ilike '%clean%'
order by customerid

```

## 3

ANSWER: 917-288-9635

```
select * from (
	select
		  customerid
		, "name"
		, to_date(birthdate, 'YYYY-MM-DD') as bdate
		, address
		, phone
		, lat
		, long
		, citystatezip
	from noahs_customers nc
) tmp
where mod(2023 - (date_part('year', bdate) :: int), 12) = 0
and (date_part('month', bdate) = 6 and date_part('day', bdate) >= 20 or
	 date_part('month', bdate) = 7 and date_part('day', bdate) < 22)
and citystatezip = 'Jamaica, NY 11435'

```

## 4

ANSWER: 607-231-3605

```
select tmp3.* from (
	select tmp2.*, noi.sku from (
		select tmp.*, no2.orderid, to_timestamp(no2.ordered, 'YYYY-MM-DD HH24:MI:SS') as ordered from (
			select * from noahs_customers nc
		) as tmp
		left join noahs_orders no2
		on tmp.customerid = no2.customerid
	) as tmp2
left join noahs_orders_items noi
on noi.orderid = tmp2.orderid
where
	date_part('hour', tmp2.ordered) < 5
and date_part('hour', tmp2.ordered) > 3
and noi.sku like 'BKY%'
and date_part('year', to_date(tmp2.birthdate, 'YYYY-MM-DD')) > 1990 
) as tmp3
order by customerid
```
