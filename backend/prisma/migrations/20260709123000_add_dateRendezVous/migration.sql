-- Migration: add dateRendezVous column to Demande
-- Generated: 2026-07-09

ALTER TABLE `Demande`
  ADD COLUMN `dateRendezVous` DATETIME NULL;
