PGDMP  .                    |            crudapp    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    41267    crudapp    DATABASE     z   CREATE DATABASE crudapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE crudapp;
                postgres    false            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   pg_database_owner    false    6                        3079    41268    pgcrypto 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
    DROP EXTENSION pgcrypto;
                   false            �           0    0    EXTENSION pgcrypto    COMMENT     <   COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
                        false    2            �            1255    41305    encriptar_password()    FUNCTION     �   CREATE FUNCTION public.encriptar_password() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF NEW.password IS DISTINCT FROM OLD.password THEN
        NEW.password := generar_hash_bcrypt(NEW.password);
    END IF;
    RETURN NEW;
END;
$$;
 +   DROP FUNCTION public.encriptar_password();
       public          postgres    false            �            1255    41306    generar_hash_bcrypt(text)    FUNCTION     �   CREATE FUNCTION public.generar_hash_bcrypt(contrasena text) RETURNS text
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN crypt(contrasena, gen_salt('bf'));
END;
$$;
 ;   DROP FUNCTION public.generar_hash_bcrypt(contrasena text);
       public          postgres    false            �            1259    41315    users    TABLE     �  CREATE TABLE public.users (
    user_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    status character varying(20) NOT NULL,
    username character varying(20) NOT NULL,
    password text NOT NULL,
    registration_date timestamp without time zone NOT NULL,
    last_update_date timestamp without time zone,
    insertion_user character varying(100) NOT NULL,
    update_user character varying(100),
    permissions text NOT NULL,
    user_type text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    41320    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    216            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    217            A           2604    41330    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    217    216            �          0    41315    users 
   TABLE DATA           �   COPY public.users (user_id, full_name, status, username, password, registration_date, last_update_date, insertion_user, update_user, permissions, user_type) FROM stdin;
    public          postgres    false    216   b       �           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 6, true);
          public          postgres    false    217            C           2606    41338    users unique_username 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT unique_username;
       public            postgres    false    216            E           2606    41340    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            F           2620    41341     users encriptar_password_trigger    TRIGGER     �   CREATE TRIGGER encriptar_password_trigger BEFORE INSERT OR UPDATE OF password ON public.users FOR EACH ROW EXECUTE FUNCTION public.encriptar_password();
 9   DROP TRIGGER encriptar_password_trigger ON public.users;
       public          postgres    false    254    216    216            �   �   x�e��n�@���İU�� ;��M������ ��"3L+O_�^tw�IN�9HfB��^2�}g�a#�]�ڍ{.ly�VH�Uxw�m�r�.W*7�����Hn�)�
�	���nz>�!��q|�hF��Z�U,kz�e0N�(��6�`�E�h����;��s�\-���4h�*^�n۽����%��O���m������s�:���J�|��E!��Oݡ�A{i��	x�a�     