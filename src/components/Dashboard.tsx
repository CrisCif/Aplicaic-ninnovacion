import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  AlertTriangle,
  Leaf,
  Users,
  Trophy,
  Wind,
  Droplets,
  Sun,
} from 'lucide-react';

const pollutionData = [
  { time: '00:00', PM25: 45, NO2: 30 },
  { time: '04:00', PM25: 38, NO2: 25 },
  { time: '08:00', PM25: 52, NO2: 35 },
  { time: '12:00', PM25: 63, NO2: 45 },
  { time: '16:00', PM25: 58, NO2: 40 },
  { time: '20:00', PM25: 48, NO2: 32 },
];

const communeData = [
  { name: 'Las Condes', value: 42, target: 35 },
  { name: 'Providencia', value: 38, target: 35 },
  { name: 'Santiago', value: 55, target: 35 },
  { name: 'Ñuñoa', value: 45, target: 35 },
  { name: 'La Florida', value: 50, target: 35 },
];

const weatherData = {
  temperature: 24,
  humidity: 65,
  windSpeed: 12,
};

const StatCard = ({
  icon: Icon,
  title,
  value,
  description,
  color,
  percentage,
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <div className="flex items-baseline mt-1">
          <CountUp
            end={parseFloat(value)}
            duration={2}
            separator=","
            decimals={value.toString().includes('.') ? 1 : 0}
            className="text-2xl font-bold"
          />
          {percentage && (
            <span className="ml-2 text-sm text-green-500">+{percentage}%</span>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </motion.div>
);

const WeatherWidget = ({ data }: { data: typeof weatherData }) => (
  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
    <h3 className="font-semibold mb-4">Clima Actual</h3>
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col items-center">
        <Sun className="h-8 w-8 mb-2" />
        <span className="text-xl font-bold">{data.temperature}°C</span>
        <span className="text-sm opacity-75">Temperatura</span>
      </div>
      <div className="flex flex-col items-center">
        <Droplets className="h-8 w-8 mb-2" />
        <span className="text-xl font-bold">{data.humidity}%</span>
        <span className="text-sm opacity-75">Humedad</span>
      </div>
      <div className="flex flex-col items-center">
        <Wind className="h-8 w-8 mb-2" />
        <span className="text-xl font-bold">{data.windSpeed}</span>
        <span className="text-sm opacity-75">Viento (km/h)</span>
      </div>
    </div>
  </div>
);

const AQIGauge = ({ value }: { value: number }) => (
  <div className="w-32 mx-auto">
    <CircularProgressbar
      value={value}
      maxValue={150}
      text={`${value}`}
      styles={buildStyles({
        textSize: '1.5rem',
        pathColor: value < 50 ? '#10B981' : value < 100 ? '#F59E0B' : '#EF4444',
        textColor: '#1F2937',
        trailColor: '#E5E7EB',
      })}
    />
  </div>
);

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Tablero Ambiental</h1>
        <p className="text-gray-600 mt-1">
          Monitorea la calidad del aire y el impacto comunitario en tiempo real
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={AlertTriangle}
          title="Calidad del Aire (AQI)"
          value="63"
          description="Calidad de aire moderada"
          color="bg-yellow-500"
          percentage="12"
        />
        <StatCard
          icon={Leaf}
          title="Tu Impacto"
          value="128.5"
          description="CO₂ reducido este mes"
          color="bg-green-500"
          percentage="8"
        />
        <StatCard
          icon={Users}
          title="Comunidad"
          value="1,234"
          description="Participantes activos"
          color="bg-blue-500"
          percentage="15"
        />
        <StatCard
          icon={Trophy}
          title="Tu Posición"
          value="42"
          description="En Las Condes"
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">
              Tendencias de Calidad del Aire (24 horas)
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pollutionData}>
                  <defs>
                    <linearGradient id="colorPM25" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorNO2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="time" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="PM25"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorPM25)"
                    name="PM2.5"
                  />
                  <Area
                    type="monotone"
                    dataKey="NO2"
                    stroke="#6366F1"
                    fillOpacity={1}
                    fill="url(#colorNO2)"
                    name="NO₂"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Calidad del Aire Actual
            </h2>
            <AQIGauge value={63} />
            <div className="mt-4 text-center">
              <p className="text-yellow-500 font-semibold">Moderada</p>
              <p className="text-sm text-gray-600 mt-1">
                Las personas sensibles deben limitar actividades al aire libre
              </p>
            </div>
          </div>

          <WeatherWidget data={weatherData} />
        </motion.div>
      </div>

      <motion.div
        className="bg-white p-6 rounded-xl shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-lg font-semibold mb-4">
          Calidad del Aire por Comuna
        </h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={communeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFF',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              />
              <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
