PGDMP     &    $                {            videogames_j21q    15.2    15.2 3    v           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            w           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            x           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            y           1262    16389    videogames_j21q    DATABASE     z   CREATE DATABASE videogames_j21q WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF8';
    DROP DATABASE videogames_j21q;
                admin    false            z           0    0    videogames_j21q    DATABASE PROPERTIES     8   ALTER DATABASE videogames_j21q SET "TimeZone" TO 'utc';
                     admin    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                admin    false                        3079    16441 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false    6            {           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            |           0    0    FUNCTION uuid_generate_v1()    ACL     :   GRANT ALL ON FUNCTION public.uuid_generate_v1() TO admin;
          public          postgres    false    230            }           0    0    FUNCTION uuid_generate_v1mc()    ACL     <   GRANT ALL ON FUNCTION public.uuid_generate_v1mc() TO admin;
          public          postgres    false    228            ~           0    0 4   FUNCTION uuid_generate_v3(namespace uuid, name text)    ACL     S   GRANT ALL ON FUNCTION public.uuid_generate_v3(namespace uuid, name text) TO admin;
          public          postgres    false    225                       0    0    FUNCTION uuid_generate_v4()    ACL     :   GRANT ALL ON FUNCTION public.uuid_generate_v4() TO admin;
          public          postgres    false    226            �           0    0 4   FUNCTION uuid_generate_v5(namespace uuid, name text)    ACL     S   GRANT ALL ON FUNCTION public.uuid_generate_v5(namespace uuid, name text) TO admin;
          public          postgres    false    227            �           0    0    FUNCTION uuid_nil()    ACL     2   GRANT ALL ON FUNCTION public.uuid_nil() TO admin;
          public          postgres    false    231            �           0    0    FUNCTION uuid_ns_dns()    ACL     5   GRANT ALL ON FUNCTION public.uuid_ns_dns() TO admin;
          public          postgres    false    229            �           0    0    FUNCTION uuid_ns_oid()    ACL     5   GRANT ALL ON FUNCTION public.uuid_ns_oid() TO admin;
          public          postgres    false    224            �           0    0    FUNCTION uuid_ns_url()    ACL     5   GRANT ALL ON FUNCTION public.uuid_ns_url() TO admin;
          public          postgres    false    223            �           0    0    FUNCTION uuid_ns_x500()    ACL     6   GRANT ALL ON FUNCTION public.uuid_ns_x500() TO admin;
          public          postgres    false    232            �            1259    16691    genres    TABLE     �   CREATE TABLE public.genres (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.genres;
       public         heap    admin    false    6            �            1259    16690    genres_id_seq    SEQUENCE     �   CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.genres_id_seq;
       public          admin    false    6    217            �           0    0    genres_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;
          public          admin    false    216            �            1259    16698 	   platforms    TABLE     �   CREATE TABLE public.platforms (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.platforms;
       public         heap    admin    false    6            �            1259    16487    platforms_id_seq    SEQUENCE     y   CREATE SEQUENCE public.platforms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.platforms_id_seq;
       public          admin    false    6            �            1259    16697    platforms_id_seq1    SEQUENCE     �   CREATE SEQUENCE public.platforms_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.platforms_id_seq1;
       public          admin    false    6    219            �           0    0    platforms_id_seq1    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.platforms_id_seq1 OWNED BY public.platforms.id;
          public          admin    false    218            �            1259    16704 
   videogames    TABLE     i  CREATE TABLE public.videogames (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    background_image character varying(255),
    released date,
    rating numeric(3,1),
    source character varying(10) DEFAULT 'own'::character varying,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.videogames;
       public         heap    admin    false    6            �            1259    16712    videogames_genres    TABLE     �   CREATE TABLE public.videogames_genres (
    "genreId" integer NOT NULL,
    "videogameId" uuid NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
 %   DROP TABLE public.videogames_genres;
       public         heap    admin    false    6            �            1259    16727    videogames_platforms    TABLE     �   CREATE TABLE public.videogames_platforms (
    "platformId" integer NOT NULL,
    "videogameId" uuid NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
 (   DROP TABLE public.videogames_platforms;
       public         heap    admin    false    6            �           2604    16694 	   genres id    DEFAULT     f   ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);
 8   ALTER TABLE public.genres ALTER COLUMN id DROP DEFAULT;
       public          admin    false    216    217    217            �           2604    16701    platforms id    DEFAULT     m   ALTER TABLE ONLY public.platforms ALTER COLUMN id SET DEFAULT nextval('public.platforms_id_seq1'::regclass);
 ;   ALTER TABLE public.platforms ALTER COLUMN id DROP DEFAULT;
       public          admin    false    219    218    219            n          0    16691    genres 
   TABLE DATA           D   COPY public.genres (id, name, "createdAt", "updatedAt") FROM stdin;
    public          admin    false    217   r7       p          0    16698 	   platforms 
   TABLE DATA           G   COPY public.platforms (id, name, "createdAt", "updatedAt") FROM stdin;
    public          admin    false    219   �8       q          0    16704 
   videogames 
   TABLE DATA           �   COPY public.videogames (id, name, description, background_image, released, rating, source, "createdAt", "updatedAt") FROM stdin;
    public          admin    false    220   �:       r          0    16712    videogames_genres 
   TABLE DATA           _   COPY public.videogames_genres ("genreId", "videogameId", "createdAt", "updatedAt") FROM stdin;
    public          admin    false    221   �;       s          0    16727    videogames_platforms 
   TABLE DATA           e   COPY public.videogames_platforms ("platformId", "videogameId", "createdAt", "updatedAt") FROM stdin;
    public          admin    false    222   ,<       �           0    0    genres_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.genres_id_seq', 1, false);
          public          admin    false    216            �           0    0    platforms_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.platforms_id_seq', 1, true);
          public          admin    false    215            �           0    0    platforms_id_seq1    SEQUENCE SET     @   SELECT pg_catalog.setval('public.platforms_id_seq1', 1, false);
          public          admin    false    218            �           2606    16696    genres genres_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.genres DROP CONSTRAINT genres_pkey;
       public            admin    false    217            �           2606    16703    platforms platforms_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.platforms
    ADD CONSTRAINT platforms_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.platforms DROP CONSTRAINT platforms_pkey;
       public            admin    false    219            �           2606    16716 (   videogames_genres videogames_genres_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.videogames_genres
    ADD CONSTRAINT videogames_genres_pkey PRIMARY KEY ("genreId", "videogameId");
 R   ALTER TABLE ONLY public.videogames_genres DROP CONSTRAINT videogames_genres_pkey;
       public            admin    false    221    221            �           2606    16711    videogames videogames_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.videogames
    ADD CONSTRAINT videogames_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.videogames DROP CONSTRAINT videogames_pkey;
       public            admin    false    220            �           2606    16731 .   videogames_platforms videogames_platforms_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.videogames_platforms
    ADD CONSTRAINT videogames_platforms_pkey PRIMARY KEY ("platformId", "videogameId");
 X   ALTER TABLE ONLY public.videogames_platforms DROP CONSTRAINT videogames_platforms_pkey;
       public            admin    false    222    222            �           2606    16717 0   videogames_genres videogames_genres_genreId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.videogames_genres
    ADD CONSTRAINT "videogames_genres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES public.genres(id) ON UPDATE CASCADE ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.videogames_genres DROP CONSTRAINT "videogames_genres_genreId_fkey";
       public          admin    false    3025    217    221            �           2606    16722 4   videogames_genres videogames_genres_videogameId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.videogames_genres
    ADD CONSTRAINT "videogames_genres_videogameId_fkey" FOREIGN KEY ("videogameId") REFERENCES public.videogames(id) ON UPDATE CASCADE ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.videogames_genres DROP CONSTRAINT "videogames_genres_videogameId_fkey";
       public          admin    false    221    220    3029            �           2606    16732 9   videogames_platforms videogames_platforms_platformId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.videogames_platforms
    ADD CONSTRAINT "videogames_platforms_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES public.platforms(id) ON UPDATE CASCADE ON DELETE CASCADE;
 e   ALTER TABLE ONLY public.videogames_platforms DROP CONSTRAINT "videogames_platforms_platformId_fkey";
       public          admin    false    219    3027    222            �           2606    16737 :   videogames_platforms videogames_platforms_videogameId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.videogames_platforms
    ADD CONSTRAINT "videogames_platforms_videogameId_fkey" FOREIGN KEY ("videogameId") REFERENCES public.videogames(id) ON UPDATE CASCADE ON DELETE CASCADE;
 f   ALTER TABLE ONLY public.videogames_platforms DROP CONSTRAINT "videogames_platforms_videogameId_fkey";
       public          admin    false    220    3029    222                       826    16391     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     M   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO admin;
                   postgres    false                       826    16393    DEFAULT PRIVILEGES FOR TYPES    DEFAULT ACL     I   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO admin;
                   postgres    false                       826    16392     DEFAULT PRIVILEGES FOR FUNCTIONS    DEFAULT ACL     M   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO admin;
                   postgres    false                       826    16390    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     J   ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO admin;
                   postgres    false            n     x����n�0���ȽJ�!7Z5Q�P�����dpd�H��z7H>�~��8�����)[*��oXq���ݞ�JF$g�3H�";<��#"��O5��Rr���D�Qh�C��)Q�Cs��+��g�phRd��>\8ႆ�5
���eb+8cP�e*P��߬�ϸ����K��.8���̴�������&��a�#KY��Gd'��}<Ϛ +ᄽ6�V��� ��ܜ�W�)D�2��͌�{5I��N&ҿ;B�Q��      p     x����r�0 ���)t�X�%�ܨ��t`Fm�!akM���M޾�xB8O��A��W+"X��B�'!�0Fh|Ǧw!�I�0�4�a����ֺ��r�D86[�NV��]���'B�ښ���R�ai��T�#�m�W�����'��s�C�0����	$�I�9���A�F,RP���l��� :,.��]݌��ߗ��cq�0O,�3�?�-��)��e[��*����'6������Ҥ���Ӎɧ%}�vt����Ȭ���[N��R�v��V$?�OA-�&���~]�C'�N7��ɣλ�q�����k�oo;C���RW��p�!�dV��E�X�Vז����k��!�`|0��l0�u[����o,$(�lm�]�h@ԏ�DR� <*��"F�f����Ae��Lc�Ơٌ(��k߫2�t�J��s�0������G'�Q7���:t?%zY$�k�˼��S���+t6���e�}]}t9�SW���JX�	�%��q(x�	������      q   �   x����N�0Eg�+�#;�=�q�1�P�(K�iP�D�#~�tAt`E���L�km�l,w�WR��Y8����6�]L,]���<oO���e_"8����]ͥ�w�q{�N�|��.W�/o��'��ݣ�ki���{��W�s�Ik�� 6}�?�M��")Pw  ��̺V��CQX�<�
,x��Z��NJ�g�:��zu�['��PW�2x��I���CdY���s�      r   r   x�}̻�0 �Z��}@���%MhE��`wA �U8-�,h�r�������bo�XY ���x�5r{�?�Z"O#C���;����Իo��A�I6����5���l��M'E      s   r   x�}̻�0 �Z��}@�_I�,iB+��� )�z�YY����KM���(��"d{�"$��(rp�.S���?V"Og'��Z�-꘍K���V�� ���{_��g�'&�     