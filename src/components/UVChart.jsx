import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const uvValue = payload[0].value;
    
    // Texto y color dinámico para el tooltip
    const getUVInfo = (val) => {
      if (val <= 2) return { text: "Bajo", color: "text-green-500" };
      if (val <= 5) return { text: "Moderado", color: "text-yellow-500" };
      if (val <= 7) return { text: "Alto", color: "text-orange-500" };
      if (val <= 10) return { text: "Muy Alto", color: "text-red-500" };
      return { text: "Extremo", color: "text-purple-500" };
    };

    const info = getUVInfo(uvValue);

    return (
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <p className="font-bold text-gray-800 dark:text-gray-200">{label} hs</p>
        <div className="flex items-center gap-2">
           <span className={`font-bold ${info.color}`}>
             UV: {uvValue}
           </span>
           <span className="text-xs text-gray-500 dark:text-gray-400">({info.text})</span>
        </div>
      </div>
    );
  }
  return null;
};

const UVChart = ({ uvValue = 0 }) => {
  // Generamos la curva suave
  const generateUVData = () => {
    const data = [];
    const maxUV = uvValue > 0 ? uvValue : 0; 
    
    for (let hour = 6; hour <= 20; hour++) {
      let simulatedValue = 0;
      if (maxUV > 0) {
         // Pico a las 13:00
         const distFromNoon = Math.abs(13 - hour);
         if (distFromNoon < 6) {
           simulatedValue = maxUV * Math.cos((distFromNoon / 7) * (Math.PI / 2));
         }
      }
      data.push({
        time: `${hour}:00`,
        uv: Math.max(0, parseFloat(simulatedValue.toFixed(1)))
      });
    }
    return data;
  };

  const chartData = generateUVData();

  return (
    <div className="w-full h-full min-h-[250px] bg-white/30 dark:bg-gray-800/30 rounded-2xl p-4 backdrop-blur-md border border-white/10 shadow-inner flex flex-col">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          Radiación UV (Hoy)
        </h3>
        <span className="text-xs px-2 py-1 rounded-full bg-white/40 dark:bg-black/20 font-mono font-bold">
            Máx: {uvValue}
        </span>
      </div>
      
      <div className="flex-grow w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              {/* AQUÍ ESTÁ LA MAGIA DEL COLOR:
                  Definimos un degradado vertical fijo que cubre toda la altura del gráfico (0 a 14).
                  - Si la curva es bajita (UV 2), solo mostrará la parte verde/amarilla de abajo.
                  - Si la curva es alta (UV 11), llegará hasta la parte violeta de arriba.
              */}
              <linearGradient id="uvScaleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9}/>   {/* 14+ Violeta */}
                <stop offset="20%" stopColor="#ef4444" stopOpacity={0.9}/>   {/* 10-13 Rojo */}
                <stop offset="40%" stopColor="#f97316" stopOpacity={0.9}/>   {/* 7-9 Naranja */}
                <stop offset="60%" stopColor="#eab308" stopOpacity={0.9}/>   {/* 4-6 Amarillo */}
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.9}/>  {/* 0-3 Verde */}
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
            
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 11 }} 
              interval={2}
              dy={10}
            />
            
            {/* IMPORTANTE: Fijamos el dominio en [0, 14].
               Esto evita que un UV de 2 se vea gigante y violeta. 
               Ahora se verá bajito y verde.
            */}
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              domain={[0, 14]} 
              ticks={[0, 3, 6, 9, 12, 14]} 
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff50', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            <Area 
              type="monotone" 
              dataKey="uv" 
              stroke="url(#uvScaleGradient)" 
              strokeWidth={4}
              fillOpacity={0.8} 
              fill="url(#uvScaleGradient)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UVChart;