const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    // Attempt a simple query to verify DB connectivity
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    res.json({ ok: true, db: 'connected' });
  } catch (error) {
    console.error('Health check DB error:', error);
    res.status(500).json({ ok: false, db: 'error', error: error.message });
  }
});

module.exports = router;
