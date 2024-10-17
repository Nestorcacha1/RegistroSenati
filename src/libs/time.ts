import { set, isBefore, isSameDay } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

const PERU_TIMEZONE = 'America/Lima'

export function getPeruvianHours() {
	// Hora actual
	const now = new Date()

	// Establecer 6 AM para el día de hoy en hora local
	const startTime = set(new Date(), {
		hours: 6,
		minutes: 0,
		seconds: 0,
		milliseconds: 0,
	})

	// Establecer 10 PM para el día de hoy en hora local
	const endTime = set(new Date(), {
		hours: 22, // 10 PM
		minutes: 0,
		seconds: 0,
		milliseconds: 0,
	})

	// Convertir ambas fechas a UTC en la zona horaria de Perú
	const startUtc = formatInTimeZone(
		startTime,
		PERU_TIMEZONE,
		'yyyy-MM-dd HH:mm:ssXXX'
	)
	const endUtc = formatInTimeZone(
		endTime,
		PERU_TIMEZONE,
		'yyyy-MM-dd HH:mm:ssXXX'
	)

	// Validar si la fecha actual no es el mismo día que las fechas de inicio y fin
	if (!isSameDay(now, startTime)) {
		return {
			message:
				'No se muestra información para el día anterior o futuro. Vuelve el día correcto.',
		}
	}

	// Si la hora actual es después de las 10:00 PM, mostrar mensaje para el siguiente día
	if (!isBefore(now, endTime)) {
		return {
			message: 'El tiempo ya ha pasado para hoy, vuelve mañana a las 6 AM',
		}
	}

	return { startUtc, endUtc }
}
