PGDMP  7    5                |         	   ecommerce    16.1    16.1 r    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16424 	   ecommerce    DATABASE     |   CREATE DATABASE ecommerce WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE ecommerce;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    148870 	   addresses    TABLE     $  CREATE TABLE public.addresses (
    address_id integer NOT NULL,
    user_id integer,
    address_type character varying(20),
    street_address character varying(255) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(100),
    postal_code character varying(20) NOT NULL,
    country character varying(100) NOT NULL,
    is_default boolean DEFAULT false,
    CONSTRAINT addresses_address_type_check CHECK (((address_type)::text = ANY ((ARRAY['billing'::character varying, 'shipping'::character varying])::text[])))
);
    DROP TABLE public.addresses;
       public         heap    postgres    false    4            �            1259    148869    addresses_address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.addresses_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.addresses_address_id_seq;
       public          postgres    false    4    218            �           0    0    addresses_address_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.addresses_address_id_seq OWNED BY public.addresses.address_id;
          public          postgres    false    217            �            1259    149052    banner    TABLE     7  CREATE TABLE public.banner (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    image_url character varying(255) NOT NULL,
    link_url character varying(255),
    description text,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.banner;
       public         heap    postgres    false    4            �            1259    149051    banner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.banner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.banner_id_seq;
       public          postgres    false    238    4            �           0    0    banner_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.banner_id_seq OWNED BY public.banner.id;
          public          postgres    false    237            �            1259    148938    cart    TABLE     �   CREATE TABLE public.cart (
    cart_id integer NOT NULL,
    user_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.cart;
       public         heap    postgres    false    4            �            1259    148937    cart_cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.cart_cart_id_seq;
       public          postgres    false    4    226            �           0    0    cart_cart_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.cart.cart_id;
          public          postgres    false    225            �            1259    148952 
   cart_items    TABLE       CREATE TABLE public.cart_items (
    cart_item_id integer NOT NULL,
    cart_id integer,
    product_id integer,
    quantity integer NOT NULL,
    added_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT cart_items_quantity_check CHECK ((quantity > 0))
);
    DROP TABLE public.cart_items;
       public         heap    postgres    false    4            �            1259    148951    cart_items_cart_item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_items_cart_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.cart_items_cart_item_id_seq;
       public          postgres    false    4    228            �           0    0    cart_items_cart_item_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.cart_items_cart_item_id_seq OWNED BY public.cart_items.cart_item_id;
          public          postgres    false    227            �            1259    148886 
   categories    TABLE     �   CREATE TABLE public.categories (
    category_id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    parent_category_id integer,
    is_active boolean DEFAULT true,
    image_url character varying(255)
);
    DROP TABLE public.categories;
       public         heap    postgres    false    4            �            1259    148885    categories_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.categories_category_id_seq;
       public          postgres    false    4    220            �           0    0    categories_category_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;
          public          postgres    false    219            �            1259    149033 	   discounts    TABLE       CREATE TABLE public.discounts (
    discount_id integer NOT NULL,
    code character varying(50),
    description text,
    discount_type character varying(20),
    value numeric(10,2) NOT NULL,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    minimum_purchase_amount numeric(10,2),
    is_active boolean DEFAULT true,
    CONSTRAINT discounts_discount_type_check CHECK (((discount_type)::text = ANY ((ARRAY['percentage'::character varying, 'fixed_amount'::character varying])::text[])))
);
    DROP TABLE public.discounts;
       public         heap    postgres    false    4            �            1259    149032    discounts_discount_id_seq    SEQUENCE     �   CREATE SEQUENCE public.discounts_discount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.discounts_discount_id_seq;
       public          postgres    false    236    4            �           0    0    discounts_discount_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.discounts_discount_id_seq OWNED BY public.discounts.discount_id;
          public          postgres    false    235            �            1259    148995    order_items    TABLE     �   CREATE TABLE public.order_items (
    order_item_id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    subtotal numeric(10,2) NOT NULL
);
    DROP TABLE public.order_items;
       public         heap    postgres    false    4            �            1259    148994    order_items_order_item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_items_order_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.order_items_order_item_id_seq;
       public          postgres    false    232    4            �           0    0    order_items_order_item_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.order_items_order_item_id_seq OWNED BY public.order_items.order_item_id;
          public          postgres    false    231            �            1259    148971    orders    TABLE       CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id integer,
    total_amount numeric(10,2) NOT NULL,
    order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    shipping_address_id integer,
    billing_address_id integer,
    order_status character varying(20),
    payment_method character varying(50),
    tracking_number character varying(100),
    CONSTRAINT orders_order_status_check CHECK (((order_status)::text = ANY ((ARRAY['pending'::character varying, 'processing'::character varying, 'shipped'::character varying, 'delivered'::character varying, 'cancelled'::character varying])::text[])))
);
    DROP TABLE public.orders;
       public         heap    postgres    false    4            �            1259    148970    orders_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.orders_order_id_seq;
       public          postgres    false    230    4            �           0    0    orders_order_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;
          public          postgres    false    229            �            1259    148925    product_images    TABLE     �   CREATE TABLE public.product_images (
    image_id integer NOT NULL,
    product_id integer,
    image_url character varying(255) NOT NULL,
    is_primary boolean DEFAULT false
);
 "   DROP TABLE public.product_images;
       public         heap    postgres    false    4            �            1259    148924    product_images_image_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_images_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.product_images_image_id_seq;
       public          postgres    false    224    4            �           0    0    product_images_image_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.product_images_image_id_seq OWNED BY public.product_images.image_id;
          public          postgres    false    223            �            1259    148901    products    TABLE     �  CREATE TABLE public.products (
    product_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    category_id integer,
    price numeric(10,2) NOT NULL,
    stock_quantity integer NOT NULL,
    vendor_id integer,
    sku character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_active boolean DEFAULT true,
    weight numeric(8,2),
    dimensions character varying(100),
    CONSTRAINT chk_positive_price CHECK ((price >= (0)::numeric)),
    CONSTRAINT chk_positive_stock CHECK ((stock_quantity >= 0))
);
    DROP TABLE public.products;
       public         heap    postgres    false    4            �            1259    148900    products_product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.products_product_id_seq;
       public          postgres    false    222    4            �           0    0    products_product_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;
          public          postgres    false    221            �            1259    149012    reviews    TABLE     ,  CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    product_id integer,
    user_id integer,
    rating integer,
    review_text text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);
    DROP TABLE public.reviews;
       public         heap    postgres    false    4            �            1259    149011    reviews_review_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reviews_review_id_seq;
       public          postgres    false    234    4            �           0    0    reviews_review_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;
          public          postgres    false    233            �            1259    148853    users    TABLE     �  CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    phone_number character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_login timestamp without time zone,
    is_active boolean DEFAULT true,
    role character varying(20),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['customer'::character varying, 'admin'::character varying, 'vendor'::character varying])::text[])))
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    148852    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    4    216            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    215            �           2604    148873    addresses address_id    DEFAULT     |   ALTER TABLE ONLY public.addresses ALTER COLUMN address_id SET DEFAULT nextval('public.addresses_address_id_seq'::regclass);
 C   ALTER TABLE public.addresses ALTER COLUMN address_id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    149055 	   banner id    DEFAULT     f   ALTER TABLE ONLY public.banner ALTER COLUMN id SET DEFAULT nextval('public.banner_id_seq'::regclass);
 8   ALTER TABLE public.banner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    238    238            �           2604    148941    cart cart_id    DEFAULT     l   ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);
 ;   ALTER TABLE public.cart ALTER COLUMN cart_id DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    148955    cart_items cart_item_id    DEFAULT     �   ALTER TABLE ONLY public.cart_items ALTER COLUMN cart_item_id SET DEFAULT nextval('public.cart_items_cart_item_id_seq'::regclass);
 F   ALTER TABLE public.cart_items ALTER COLUMN cart_item_id DROP DEFAULT;
       public          postgres    false    228    227    228            �           2604    148889    categories category_id    DEFAULT     �   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    149036    discounts discount_id    DEFAULT     ~   ALTER TABLE ONLY public.discounts ALTER COLUMN discount_id SET DEFAULT nextval('public.discounts_discount_id_seq'::regclass);
 D   ALTER TABLE public.discounts ALTER COLUMN discount_id DROP DEFAULT;
       public          postgres    false    236    235    236            �           2604    148998    order_items order_item_id    DEFAULT     �   ALTER TABLE ONLY public.order_items ALTER COLUMN order_item_id SET DEFAULT nextval('public.order_items_order_item_id_seq'::regclass);
 H   ALTER TABLE public.order_items ALTER COLUMN order_item_id DROP DEFAULT;
       public          postgres    false    231    232    232            �           2604    148974    orders order_id    DEFAULT     r   ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);
 >   ALTER TABLE public.orders ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    148928    product_images image_id    DEFAULT     �   ALTER TABLE ONLY public.product_images ALTER COLUMN image_id SET DEFAULT nextval('public.product_images_image_id_seq'::regclass);
 F   ALTER TABLE public.product_images ALTER COLUMN image_id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    148904    products product_id    DEFAULT     z   ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);
 B   ALTER TABLE public.products ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    149015    reviews review_id    DEFAULT     v   ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);
 @   ALTER TABLE public.reviews ALTER COLUMN review_id DROP DEFAULT;
       public          postgres    false    233    234    234            �           2604    148856    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    215    216    216            q          0    148870 	   addresses 
   TABLE DATA           �   COPY public.addresses (address_id, user_id, address_type, street_address, city, state, postal_code, country, is_default) FROM stdin;
    public          postgres    false    218   ֒       �          0    149052    banner 
   TABLE DATA           d   COPY public.banner (id, title, image_url, link_url, description, is_active, created_at) FROM stdin;
    public          postgres    false    238   �       y          0    148938    cart 
   TABLE DATA           H   COPY public.cart (cart_id, user_id, created_at, updated_at) FROM stdin;
    public          postgres    false    226   ˓       {          0    148952 
   cart_items 
   TABLE DATA           [   COPY public.cart_items (cart_item_id, cart_id, product_id, quantity, added_at) FROM stdin;
    public          postgres    false    228   �       s          0    148886 
   categories 
   TABLE DATA           n   COPY public.categories (category_id, name, description, parent_category_id, is_active, image_url) FROM stdin;
    public          postgres    false    220   �       �          0    149033 	   discounts 
   TABLE DATA           �   COPY public.discounts (discount_id, code, description, discount_type, value, start_date, end_date, minimum_purchase_amount, is_active) FROM stdin;
    public          postgres    false    236   ��                 0    148995    order_items 
   TABLE DATA           j   COPY public.order_items (order_item_id, order_id, product_id, quantity, unit_price, subtotal) FROM stdin;
    public          postgres    false    232   ؕ       }          0    148971    orders 
   TABLE DATA           �   COPY public.orders (order_id, user_id, total_amount, order_date, shipping_address_id, billing_address_id, order_status, payment_method, tracking_number) FROM stdin;
    public          postgres    false    230   ��       w          0    148925    product_images 
   TABLE DATA           U   COPY public.product_images (image_id, product_id, image_url, is_primary) FROM stdin;
    public          postgres    false    224   �       u          0    148901    products 
   TABLE DATA           �   COPY public.products (product_id, name, description, category_id, price, stock_quantity, vendor_id, sku, created_at, updated_at, is_active, weight, dimensions) FROM stdin;
    public          postgres    false    222   /�       �          0    149012    reviews 
   TABLE DATA           b   COPY public.reviews (review_id, product_id, user_id, rating, review_text, created_at) FROM stdin;
    public          postgres    false    234   L�       o          0    148853    users 
   TABLE DATA           �   COPY public.users (user_id, username, email, password_hash, first_name, last_name, phone_number, created_at, last_login, is_active, role) FROM stdin;
    public          postgres    false    216   i�       �           0    0    addresses_address_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.addresses_address_id_seq', 1, false);
          public          postgres    false    217            �           0    0    banner_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.banner_id_seq', 3, true);
          public          postgres    false    237            �           0    0    cart_cart_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.cart_cart_id_seq', 1, false);
          public          postgres    false    225            �           0    0    cart_items_cart_item_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.cart_items_cart_item_id_seq', 1, false);
          public          postgres    false    227            �           0    0    categories_category_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.categories_category_id_seq', 8, true);
          public          postgres    false    219            �           0    0    discounts_discount_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.discounts_discount_id_seq', 1, false);
          public          postgres    false    235            �           0    0    order_items_order_item_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.order_items_order_item_id_seq', 1, false);
          public          postgres    false    231            �           0    0    orders_order_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.orders_order_id_seq', 1, false);
          public          postgres    false    229            �           0    0    product_images_image_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.product_images_image_id_seq', 1, false);
          public          postgres    false    223            �           0    0    products_product_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.products_product_id_seq', 1, false);
          public          postgres    false    221            �           0    0    reviews_review_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.reviews_review_id_seq', 1, false);
          public          postgres    false    233            �           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);
          public          postgres    false    215            �           2606    148879    addresses addresses_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (address_id);
 B   ALTER TABLE ONLY public.addresses DROP CONSTRAINT addresses_pkey;
       public            postgres    false    218            �           2606    149061    banner banner_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.banner
    ADD CONSTRAINT banner_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.banner DROP CONSTRAINT banner_pkey;
       public            postgres    false    238            �           2606    148959    cart_items cart_items_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (cart_item_id);
 D   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_pkey;
       public            postgres    false    228            �           2606    148945    cart cart_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    226            �           2606    148894    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    220            �           2606    149044    discounts discounts_code_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_code_key UNIQUE (code);
 F   ALTER TABLE ONLY public.discounts DROP CONSTRAINT discounts_code_key;
       public            postgres    false    236            �           2606    149042    discounts discounts_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_pkey PRIMARY KEY (discount_id);
 B   ALTER TABLE ONLY public.discounts DROP CONSTRAINT discounts_pkey;
       public            postgres    false    236            �           2606    149000    order_items order_items_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_item_id);
 F   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_pkey;
       public            postgres    false    232            �           2606    148978    orders orders_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    230            �           2606    148931 "   product_images product_images_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (image_id);
 L   ALTER TABLE ONLY public.product_images DROP CONSTRAINT product_images_pkey;
       public            postgres    false    224            �           2606    148911    products products_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    222            �           2606    148913    products products_sku_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_sku_key UNIQUE (sku);
 C   ALTER TABLE ONLY public.products DROP CONSTRAINT products_sku_key;
       public            postgres    false    222            �           2606    149021    reviews reviews_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    234            �           2606    148867    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            �           2606    148863    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �           2606    148865    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    216            �           1259    149062    idx_banner_active    INDEX     I   CREATE INDEX idx_banner_active ON public.banner USING btree (is_active);
 %   DROP INDEX public.idx_banner_active;
       public            postgres    false    238            �           1259    149047    idx_cart_items_cart    INDEX     M   CREATE INDEX idx_cart_items_cart ON public.cart_items USING btree (cart_id);
 '   DROP INDEX public.idx_cart_items_cart;
       public            postgres    false    228            �           1259    149046    idx_orders_user    INDEX     E   CREATE INDEX idx_orders_user ON public.orders USING btree (user_id);
 #   DROP INDEX public.idx_orders_user;
       public            postgres    false    230            �           1259    149048    idx_product_images_product    INDEX     [   CREATE INDEX idx_product_images_product ON public.product_images USING btree (product_id);
 .   DROP INDEX public.idx_product_images_product;
       public            postgres    false    224            �           1259    149045    idx_products_category    INDEX     Q   CREATE INDEX idx_products_category ON public.products USING btree (category_id);
 )   DROP INDEX public.idx_products_category;
       public            postgres    false    222            �           2606    148880     addresses addresses_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 J   ALTER TABLE ONLY public.addresses DROP CONSTRAINT addresses_user_id_fkey;
       public          postgres    false    218    216    4782            �           2606    148960 "   cart_items cart_items_cart_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.cart(cart_id);
 L   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_cart_id_fkey;
       public          postgres    false    228    4798    226            �           2606    148965 %   cart_items cart_items_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 O   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_product_id_fkey;
       public          postgres    false    4791    222    228            �           2606    148946    cart cart_user_id_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 @   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_user_id_fkey;
       public          postgres    false    226    216    4782            �           2606    148895 -   categories categories_parent_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.categories(category_id);
 W   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_parent_category_id_fkey;
       public          postgres    false    4788    220    220            �           2606    149001 %   order_items order_items_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);
 O   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_order_id_fkey;
       public          postgres    false    232    230    4804            �           2606    149006 '   order_items order_items_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 Q   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_product_id_fkey;
       public          postgres    false    232    222    4791            �           2606    148989 %   orders orders_billing_address_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_billing_address_id_fkey FOREIGN KEY (billing_address_id) REFERENCES public.addresses(address_id);
 O   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_billing_address_id_fkey;
       public          postgres    false    218    230    4786            �           2606    148984 &   orders orders_shipping_address_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_shipping_address_id_fkey FOREIGN KEY (shipping_address_id) REFERENCES public.addresses(address_id);
 P   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_shipping_address_id_fkey;
       public          postgres    false    218    230    4786            �           2606    148979    orders orders_user_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
       public          postgres    false    4782    230    216            �           2606    148932 -   product_images product_images_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 W   ALTER TABLE ONLY public.product_images DROP CONSTRAINT product_images_product_id_fkey;
       public          postgres    false    224    222    4791            �           2606    148914 "   products products_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id);
 L   ALTER TABLE ONLY public.products DROP CONSTRAINT products_category_id_fkey;
       public          postgres    false    222    4788    220            �           2606    148919     products products_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.users(user_id);
 J   ALTER TABLE ONLY public.products DROP CONSTRAINT products_vendor_id_fkey;
       public          postgres    false    4782    222    216            �           2606    149022    reviews reviews_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 I   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_product_id_fkey;
       public          postgres    false    222    234    4791            �           2606    149027    reviews reviews_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_user_id_fkey;
       public          postgres    false    4782    216    234            q      x������ � �      �   �   x�}�9n�0Dk�������Z��:�O���D�1%�"��������)��{�bZkC�֖�1�~_�4�	h��7���P&/d!1��	���,M�42n��E��
�1Я��q큣������"�/�uRw�Rm����1�yxз�J��{)y��~�3b��<�����b�J�6z�&�sM��&�������뵷����JY|���8L�      y      x������ � �      {      x������ � �      s   �  x���Ko�0��ί�BBJhT��ҭ�c���f���0�_������@ZEݳ@���̡`�#iً3u/��kN��q\�/��PA݁���N�!����u��B��a�$-��Х#�\��Z��J�K����ZfE�M�-�.+��ZCU��	���q��n��7�5��ab����BnGd�of�2�CyǞሽeO�+$F�/��7��w`�����F�?}3�^Jݹ%�8��:c�l�mخ��o���Vbڦ�&�Q��Qd\7��0�`
�Kj0�癣b�)h���Ap��[O6a� D�G8R6�t����	�3a޳�M"��K9�~^�f?�p�F���@A��qFq3�'��N�iqXS��<cl��B�?Jx����x��#r�)�O(er~��|�X| ���f      �      x������ � �            x������ � �      }      x������ � �      w      x������ � �      u      x������ � �      �      x������ � �      o      x������ � �     