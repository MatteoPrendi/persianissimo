import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('it', 'en', 'fa');
  CREATE TYPE "public"."enum_header_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_v_published_locale" AS ENUM('it', 'en', 'fa');
  CREATE TYPE "public"."enum_home_gallery_items_size" AS ENUM('auto', 'normal', 'wide', 'tall');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_gallery_items_size" AS ENUM('auto', 'normal', 'wide', 'tall');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_published_locale" AS ENUM('it', 'en', 'fa');
  CREATE TYPE "public"."enum_footer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_published_locale" AS ENUM('it', 'en', 'fa');
  CREATE TYPE "public"."enum_contact_us_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_us_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_us_v_published_locale" AS ENUM('it', 'en', 'fa');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"_verified" boolean,
  	"_verificationtoken" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "header_menu_locales" (
  	"item_label" varchar,
  	"item_href" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_header_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_header_v_version_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v_version_menu_locales" (
  	"item_label" varchar,
  	"item_href" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__header_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__header_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "home_marquee_phrases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_marquee_phrases_locales" (
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"size" "enum_home_gallery_items_size" DEFAULT 'auto'
  );
  
  CREATE TABLE "home_gallery_items_locales" (
  	"title" varchar,
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_media_left_image_id" integer,
  	"hero_media_right_image_id" integer,
  	"introduction_media_top_left_image_id" integer,
  	"introduction_media_top_right_image_id" integer,
  	"introduction_media_bottom_left_image_id" integer,
  	"introduction_media_bottom_right_image_id" integer,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_locales" (
  	"hero_content_title" varchar,
  	"hero_content_subtitle" varchar,
  	"hero_content_button_label" varchar,
  	"hero_content_button_href" varchar,
  	"hero_media_video_url" varchar,
  	"introduction_content_badge" varchar,
  	"introduction_content_title" varchar,
  	"introduction_content_subtitle" varchar,
  	"gallery_content_title" varchar,
  	"gallery_content_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_marquee_phrases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_marquee_phrases_locales" (
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"size" "enum__home_v_version_gallery_items_size" DEFAULT 'auto',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_gallery_items_locales" (
  	"title" varchar,
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_media_left_image_id" integer,
  	"version_hero_media_right_image_id" integer,
  	"version_introduction_media_top_left_image_id" integer,
  	"version_introduction_media_top_right_image_id" integer,
  	"version_introduction_media_bottom_left_image_id" integer,
  	"version_introduction_media_bottom_right_image_id" integer,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_home_v_locales" (
  	"version_hero_content_title" varchar,
  	"version_hero_content_subtitle" varchar,
  	"version_hero_content_button_label" varchar,
  	"version_hero_content_button_href" varchar,
  	"version_hero_media_video_url" varchar,
  	"version_introduction_content_badge" varchar,
  	"version_introduction_content_title" varchar,
  	"version_introduction_content_subtitle" varchar,
  	"version_gallery_content_title" varchar,
  	"version_gallery_content_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_footer_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"info_title" varchar,
  	"schedule_title" varchar,
  	"schedule_weekday" varchar,
  	"schedule_weekend" varchar,
  	"socials_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__footer_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__footer_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_footer_v_locales" (
  	"version_info_title" varchar,
  	"version_schedule_title" varchar,
  	"version_schedule_weekday" varchar,
  	"version_schedule_weekend" varchar,
  	"version_socials_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_us" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_contact_us_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_us_locales" (
  	"heading" varchar,
  	"subtitle" varchar,
  	"fields_name_label" varchar,
  	"fields_name_placeholder" varchar,
  	"fields_last_name_label" varchar,
  	"fields_last_name_placeholder" varchar,
  	"fields_email_label" varchar,
  	"fields_email_placeholder" varchar,
  	"fields_message_label" varchar,
  	"fields_message_placeholder" varchar,
  	"fields_submit" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contact_us_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__contact_us_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__contact_us_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_contact_us_v_locales" (
  	"version_heading" varchar,
  	"version_subtitle" varchar,
  	"version_fields_name_label" varchar,
  	"version_fields_name_placeholder" varchar,
  	"version_fields_last_name_label" varchar,
  	"version_fields_last_name_placeholder" varchar,
  	"version_fields_email_label" varchar,
  	"version_fields_email_placeholder" varchar,
  	"version_fields_message_label" varchar,
  	"version_fields_message_placeholder" varchar,
  	"version_fields_submit" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_menu" ADD CONSTRAINT "header_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_menu_locales" ADD CONSTRAINT "header_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_menu" ADD CONSTRAINT "_header_v_version_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_menu_locales" ADD CONSTRAINT "_header_v_version_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v_version_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_marquee_phrases" ADD CONSTRAINT "home_marquee_phrases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_marquee_phrases_locales" ADD CONSTRAINT "home_marquee_phrases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_marquee_phrases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_gallery_items" ADD CONSTRAINT "home_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_gallery_items" ADD CONSTRAINT "home_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_gallery_items_locales" ADD CONSTRAINT "home_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_media_left_image_id_media_id_fk" FOREIGN KEY ("hero_media_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_media_right_image_id_media_id_fk" FOREIGN KEY ("hero_media_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_introduction_media_top_left_image_id_media_id_fk" FOREIGN KEY ("introduction_media_top_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_introduction_media_top_right_image_id_media_id_fk" FOREIGN KEY ("introduction_media_top_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_introduction_media_bottom_left_image_id_media_id_fk" FOREIGN KEY ("introduction_media_bottom_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_introduction_media_bottom_right_image_id_media_id_fk" FOREIGN KEY ("introduction_media_bottom_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_marquee_phrases" ADD CONSTRAINT "_home_v_version_marquee_phrases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_marquee_phrases_locales" ADD CONSTRAINT "_home_v_version_marquee_phrases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_marquee_phrases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_gallery_items" ADD CONSTRAINT "_home_v_version_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_gallery_items" ADD CONSTRAINT "_home_v_version_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_gallery_items_locales" ADD CONSTRAINT "_home_v_version_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_version_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_media_left_image_id_media_id_fk" FOREIGN KEY ("version_hero_media_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_media_right_image_id_media_id_fk" FOREIGN KEY ("version_hero_media_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_introduction_media_top_left_image_id_media_id_fk" FOREIGN KEY ("version_introduction_media_top_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_introduction_media_top_right_image_id_media_id_fk" FOREIGN KEY ("version_introduction_media_top_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_introduction_media_bottom_left_image_id_media_id_fk" FOREIGN KEY ("version_introduction_media_bottom_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_introduction_media_bottom_right_image_id_media_id_fk" FOREIGN KEY ("version_introduction_media_bottom_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_locales" ADD CONSTRAINT "_home_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_locales" ADD CONSTRAINT "_footer_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_us_locales" ADD CONSTRAINT "contact_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_us_v_locales" ADD CONSTRAINT "_contact_us_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_us_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_menu_order_idx" ON "header_menu" USING btree ("_order");
  CREATE INDEX "header_menu_parent_id_idx" ON "header_menu" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_menu_locales_locale_parent_id_unique" ON "header_menu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header__status_idx" ON "header" USING btree ("_status");
  CREATE INDEX "_header_v_version_menu_order_idx" ON "_header_v_version_menu" USING btree ("_order");
  CREATE INDEX "_header_v_version_menu_parent_id_idx" ON "_header_v_version_menu" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_header_v_version_menu_locales_locale_parent_id_unique" ON "_header_v_version_menu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_header_v_version_version__status_idx" ON "_header_v" USING btree ("version__status");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE INDEX "_header_v_snapshot_idx" ON "_header_v" USING btree ("snapshot");
  CREATE INDEX "_header_v_published_locale_idx" ON "_header_v" USING btree ("published_locale");
  CREATE INDEX "_header_v_latest_idx" ON "_header_v" USING btree ("latest");
  CREATE INDEX "_header_v_autosave_idx" ON "_header_v" USING btree ("autosave");
  CREATE INDEX "home_marquee_phrases_order_idx" ON "home_marquee_phrases" USING btree ("_order");
  CREATE INDEX "home_marquee_phrases_parent_id_idx" ON "home_marquee_phrases" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_marquee_phrases_locales_locale_parent_id_unique" ON "home_marquee_phrases_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_gallery_items_order_idx" ON "home_gallery_items" USING btree ("_order");
  CREATE INDEX "home_gallery_items_parent_id_idx" ON "home_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "home_gallery_items_image_idx" ON "home_gallery_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "home_gallery_items_locales_locale_parent_id_unique" ON "home_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_hero_media_hero_media_left_image_idx" ON "home" USING btree ("hero_media_left_image_id");
  CREATE INDEX "home_hero_media_hero_media_right_image_idx" ON "home" USING btree ("hero_media_right_image_id");
  CREATE INDEX "home_introduction_media_introduction_media_top_left_imag_idx" ON "home" USING btree ("introduction_media_top_left_image_id");
  CREATE INDEX "home_introduction_media_introduction_media_top_right_ima_idx" ON "home" USING btree ("introduction_media_top_right_image_id");
  CREATE INDEX "home_introduction_media_introduction_media_bottom_left_i_idx" ON "home" USING btree ("introduction_media_bottom_left_image_id");
  CREATE INDEX "home_introduction_media_introduction_media_bottom_right__idx" ON "home" USING btree ("introduction_media_bottom_right_image_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE UNIQUE INDEX "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_marquee_phrases_order_idx" ON "_home_v_version_marquee_phrases" USING btree ("_order");
  CREATE INDEX "_home_v_version_marquee_phrases_parent_id_idx" ON "_home_v_version_marquee_phrases" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_v_version_marquee_phrases_locales_locale_parent_id_uni" ON "_home_v_version_marquee_phrases_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_gallery_items_order_idx" ON "_home_v_version_gallery_items" USING btree ("_order");
  CREATE INDEX "_home_v_version_gallery_items_parent_id_idx" ON "_home_v_version_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_gallery_items_image_idx" ON "_home_v_version_gallery_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "_home_v_version_gallery_items_locales_locale_parent_id_uniqu" ON "_home_v_version_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_hero_media_version_hero_media_left_image_idx" ON "_home_v" USING btree ("version_hero_media_left_image_id");
  CREATE INDEX "_home_v_version_hero_media_version_hero_media_right_imag_idx" ON "_home_v" USING btree ("version_hero_media_right_image_id");
  CREATE INDEX "_home_v_version_introduction_media_version_introduction__idx" ON "_home_v" USING btree ("version_introduction_media_top_left_image_id");
  CREATE INDEX "_home_v_version_introduction_media_version_introductio_1_idx" ON "_home_v" USING btree ("version_introduction_media_top_right_image_id");
  CREATE INDEX "_home_v_version_introduction_media_version_introductio_2_idx" ON "_home_v" USING btree ("version_introduction_media_bottom_left_image_id");
  CREATE INDEX "_home_v_version_introduction_media_version_introductio_3_idx" ON "_home_v" USING btree ("version_introduction_media_bottom_right_image_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_snapshot_idx" ON "_home_v" USING btree ("snapshot");
  CREATE INDEX "_home_v_published_locale_idx" ON "_home_v" USING btree ("published_locale");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "_home_v_autosave_idx" ON "_home_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_home_v_locales_locale_parent_id_unique" ON "_home_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer__status_idx" ON "footer" USING btree ("_status");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_version_version__status_idx" ON "_footer_v" USING btree ("version__status");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_snapshot_idx" ON "_footer_v" USING btree ("snapshot");
  CREATE INDEX "_footer_v_published_locale_idx" ON "_footer_v" USING btree ("published_locale");
  CREATE INDEX "_footer_v_latest_idx" ON "_footer_v" USING btree ("latest");
  CREATE INDEX "_footer_v_autosave_idx" ON "_footer_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_footer_v_locales_locale_parent_id_unique" ON "_footer_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_us__status_idx" ON "contact_us" USING btree ("_status");
  CREATE UNIQUE INDEX "contact_us_locales_locale_parent_id_unique" ON "contact_us_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contact_us_v_version_version__status_idx" ON "_contact_us_v" USING btree ("version__status");
  CREATE INDEX "_contact_us_v_created_at_idx" ON "_contact_us_v" USING btree ("created_at");
  CREATE INDEX "_contact_us_v_updated_at_idx" ON "_contact_us_v" USING btree ("updated_at");
  CREATE INDEX "_contact_us_v_snapshot_idx" ON "_contact_us_v" USING btree ("snapshot");
  CREATE INDEX "_contact_us_v_published_locale_idx" ON "_contact_us_v" USING btree ("published_locale");
  CREATE INDEX "_contact_us_v_latest_idx" ON "_contact_us_v" USING btree ("latest");
  CREATE INDEX "_contact_us_v_autosave_idx" ON "_contact_us_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_contact_us_v_locales_locale_parent_id_unique" ON "_contact_us_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_menu" CASCADE;
  DROP TABLE "header_menu_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "_header_v_version_menu" CASCADE;
  DROP TABLE "_header_v_version_menu_locales" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "home_marquee_phrases" CASCADE;
  DROP TABLE "home_marquee_phrases_locales" CASCADE;
  DROP TABLE "home_gallery_items" CASCADE;
  DROP TABLE "home_gallery_items_locales" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "_home_v_version_marquee_phrases" CASCADE;
  DROP TABLE "_home_v_version_marquee_phrases_locales" CASCADE;
  DROP TABLE "_home_v_version_gallery_items" CASCADE;
  DROP TABLE "_home_v_version_gallery_items_locales" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_home_v_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "_footer_v_locales" CASCADE;
  DROP TABLE "contact_us" CASCADE;
  DROP TABLE "contact_us_locales" CASCADE;
  DROP TABLE "_contact_us_v" CASCADE;
  DROP TABLE "_contact_us_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_header_status";
  DROP TYPE "public"."enum__header_v_version_status";
  DROP TYPE "public"."enum__header_v_published_locale";
  DROP TYPE "public"."enum_home_gallery_items_size";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_gallery_items_size";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum__home_v_published_locale";
  DROP TYPE "public"."enum_footer_status";
  DROP TYPE "public"."enum__footer_v_version_status";
  DROP TYPE "public"."enum__footer_v_published_locale";
  DROP TYPE "public"."enum_contact_us_status";
  DROP TYPE "public"."enum__contact_us_v_version_status";
  DROP TYPE "public"."enum__contact_us_v_published_locale";`)
}
