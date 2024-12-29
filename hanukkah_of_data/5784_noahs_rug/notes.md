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

## 5

ANSWER: 631-507-6048

```
select tmp3.phone, sum(tmp3.total) as stotal from (
	select tmp2.*, noi.sku from (
		select tmp1.*, no2.orderid, no2.total from (
			select customerid, name, phone, citystatezip from noahs_customers nc
			where nc.citystatezip ilike '%staten%'
		) tmp1
		left join noahs_orders no2
		on tmp1.customerid = no2.customerid
	) tmp2
	left join noahs_orders_items noi
	on tmp2.orderid = noi.orderid
	where tmp2.orderid is not null
) tmp3
left join noahs_products np
on tmp3.sku = np.sku
where np.desc like '%Senior Cat%'
group by phone
order by stotal desc
limit 1
```

## 6

ANSWER: 585-838-9161

```
select customerid, sum(tt_paid - tt_cost) as tt_diff from (
	select no2.orderid
		, max(no2.customerid) as customerid
		, max(total) as tt_paid
		, sum(qty * wholesale_cost) as tt_cost
	from noahs_orders no2 
	left join noahs_orders_items noi on no2.orderid = noi.orderid 
	left join noahs_products np on noi.sku = np.sku
	group by no2.orderid 
) tmp
where tt_paid < tt_cost
group by customerid
order by tt_diff
limit 1
```

## 7

ANSWER: 838-335-7157

```
with tmp as (
	select
		no2.*
		, to_timestamp(no2.ordered, 'YYYY-MM-DD HH24:MI:SS') as ts_ord
		, to_timestamp(no2.shipped, 'YYYY-MM-DD HH24:MI:SS') as ts_shp
		, noi.sku
		, noi.qty
		, noi.unit_price
		, np."desc"
		, split_part(np.desc, '(', 1) as pname
		, split_part(np.desc, '(', 2) as pcolor
	from noahs_orders no2
	left join noahs_orders_items noi on no2.orderid = noi.orderid
	left join noahs_products np on noi.sku = np.sku
	where noi.sku like 'COL%'
) select * from tmp t1
inner join tmp t2
on t1.orderid != t2.orderid
where (t1.customerid = 4167 or t2.customerid = 4167)
and t1.orderid > t2.orderid
and t1.pname = t2.pname and t1.pcolor != t2.pcolor
and t1.ts_ord > t2.ts_ord
and t1.ts_ord - t2.ts_ord < interval '30 minutes'

```

## 8

ANSWER: 212-547-3518

```
select
	customerid , count(np.sku) as cnt
from noahs_orders no2
left join noahs_orders_items noi on noi.orderid = no2.orderid 
left join noahs_products np on np.sku = noi.sku
where np.sku like 'COL%'
group by customerid
order by cnt desc
limit 1
```
