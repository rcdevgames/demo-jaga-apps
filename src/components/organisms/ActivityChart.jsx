import { useEffect, useRef, useState } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts'
import { generateActivityData } from '../../api/utils'

/**
 * ActivityChart Organism Component
 * 7-day activity visualization
 */
export function ActivityChart({ data: propData, height = 200 }) {
  const data = propData || generateActivityData()
  const safeHeight = typeof height === 'number' && height > 0 ? height : 200
  const containerRef = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = containerRef.current
    if (!element) {
      return
    }

    const updateSize = () => {
      const nextWidth = element.clientWidth
      const nextHeight = element.clientHeight

      setSize((prev) => {
        if (prev.width === nextWidth && prev.height === nextHeight) {
          return prev
        }

        return { width: nextWidth, height: nextHeight }
      })
    }

    updateSize()

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(updateSize)
      resizeObserver.observe(element)

      return () => {
        resizeObserver.disconnect()
      }
    }

    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [safeHeight])

  const canRenderChart = size.width > 0 && size.height > 0

  return (
    <div ref={containerRef} className="w-full min-w-0" style={{ height: safeHeight, minHeight: safeHeight }}>
      {canRenderChart && (
        <AreaChart width={size.width} height={size.height} data={data}>
          <defs>
            <linearGradient id="colorMotions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          <XAxis
            dataKey="day"
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            labelStyle={{ color: '#9ca3af' }}
          />
          <Area
            type="monotone"
            dataKey="motions"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorMotions)"
          />
        </AreaChart>
      )}
    </div>
  )
}

export default ActivityChart
