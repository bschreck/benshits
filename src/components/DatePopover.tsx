import React, { useEffect, useState } from 'react'
import {
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonthName,
  CalendarWeek,
  CalendarMonth,
  CalendarMonths,
  CalendarDays,
  CalendarControls,
  Calendar,
  CalendarDefaultTheme,
  CalendarValues,
  CalendarDate,
} from '@uselessdev/datepicker'
import { format, isAfter, isBefore, isValid } from 'date-fns'
import {
  Box,
  Flex,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'


export function isCalendarValues(values: CalendarDate | CalendarValues): values is CalendarValues {
  return (values as CalendarValues).start !== undefined;
}

interface DatePopoverProps {
  dates: CalendarValues;
  setDates: (dates: CalendarValues) => void;
  id: string;
}

export default function DatePopover(props: DatePopoverProps) {
    const dates = props.dates;
    const setDates = props.setDates;
    const [values, setValues] = useState({
      start: '',
        end: '',
      })

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const calendarRef = React.useRef(null)
    const startInputRef = React.useRef<HTMLInputElement>(null)
    const endInputRef = React.useRef<HTMLInputElement>(null)

    const MONTHS = 2

    const match = (value: string) => value.match(/(\d{2})\/(\d{2})\/(\d{4})/)

    const handleInputChange = ({
      target,
    }: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [target.name]: target.value,
      })

      if (
        target.name === 'start' &&
        match(target.value) &&
        endInputRef.current
      ) {
        endInputRef.current.focus()
      }
    }

    const handleSelectDate = (dates: CalendarDate | CalendarValues) => {
      if (!isCalendarValues(dates)) {
        return
      }
      setDates(dates)
      console.log("set date to ", values)

      setValues({
        start: isValid(dates.start)
          ? format(dates.start as Date, 'MM/dd/yyyy')
          : '',
        end: isValid(dates.end) ? format(dates.end as Date, 'MM/dd/yyyy') : '',
      })

      if (dates.end) {
        onClose()
      }
    }

    useOutsideClick({
      ref: calendarRef,
      handler: onClose,
      enabled: isOpen,
    })

    useEffect(() => {
      if (match(values.start)) {
        const startDate = new Date(values.start)
        const isValidStartDate = isValid(startDate)
        const isAfterEndDate = dates.end && isAfter(startDate, dates.end)

        if (isValidStartDate && isAfterEndDate) {
          setValues({ ...values, end: '' })
          return setDates({ end: undefined, start: startDate })
        }

        return setDates({ ...dates, start: startDate })
      }
    }, [values.start])

    useEffect(() => {
      if (match(values.end)) {
        const endDate = new Date(values.end)
        const isValidEndDate = isValid(endDate)
        const isBeforeStartDate = dates.start && isBefore(endDate, dates.start)

        if (isValidEndDate && isBeforeStartDate) {
          setValues({ ...values, start: '' })

          startInputRef.current?.focus()

          return setDates({ start: undefined, end: endDate })
        }

        onClose()
        return setDates({ ...dates, end: endDate })
      }
    }, [values.end])

    return (
      <Box id={props.id} minH="400px">
        <Popover
          placement="auto-start"
          isOpen={isOpen}
          onClose={onClose}
          initialFocusRef={initialRef}
          isLazy
        >
          <PopoverTrigger>
            <Flex
              w="400px"
              borderWidth={1}
              rounded="md"
              p={2}
              onClick={onOpen}
              ref={initialRef}
            >
              <Input
                variant="unstyled"
                name="start"
                placeholder="MM/dd/yyyy"
                value={values.start}
                onChange={handleInputChange}
                ref={startInputRef}
              />
              <Input
                variant="unstyled"
                name="end"
                placeholder="MM/dd/yyyy"
                value={values.end}
                onChange={handleInputChange}
                ref={endInputRef}
              />
            </Flex>
          </PopoverTrigger>

          <PopoverContent
            p={0}
            w="min-content"
            border="none"
            outline="none"
            _focus={{ boxShadow: 'none' }}
            ref={calendarRef}
          >
            <Calendar
              value={dates}
              onSelectDate={handleSelectDate}
              months={MONTHS}
            >
              <PopoverBody p={0}>
                <CalendarControls>
                  <CalendarPrevButton />
                  <CalendarNextButton />
                </CalendarControls>

                <CalendarMonths>
                  {[...Array(MONTHS).keys()].map(m => (
                    <CalendarMonth key={m} month={m}>
                      <CalendarMonthName />
                      <CalendarWeek />
                      <CalendarDays />
                    </CalendarMonth>
                  ))}
                </CalendarMonths>
              </PopoverBody>
            </Calendar>
          </PopoverContent>
        </Popover>
      </Box>
    )
}
