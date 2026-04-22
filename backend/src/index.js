require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/lidar_events';

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// Schema y modelo del evento
const eventSchema = new mongoose.Schema({
  type:      { type: String, required: true },
  data:      { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);

// ─── Endpoints ───────────────────────────────────────────

// POST /events — recibir un evento del sistema robótico
app.post('/events', async (req, res) => {
  try {
    const { type, data } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'El campo "type" es obligatorio' });
    }

    const event = new Event({ type, data });
    await event.save();

    console.log(`📡 Evento recibido: [${type}]`);
    res.status(201).json({ message: 'Evento registrado', event });

  } catch (err) {
    console.error('Error al guardar evento:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /events — obtener todos los eventos (para el dashboard)
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ timestamp: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
});

// GET /health — verificar que el servidor está vivo
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// DELETE /events — limpiar todos los eventos
app.delete('/events', async (req, res) => {
  try {
    await Event.deleteMany({});
    res.json({ message: 'Eventos eliminados' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar eventos' });
  }
});

// ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en el puerto ${PORT}`);
});