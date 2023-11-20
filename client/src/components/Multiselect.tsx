'use client'
import Select from 'react-select'

interface DropdownProps {
  valores: any
  setSeleccionados: (status: any) => void
}

const Dropdown = ({ valores, setSeleccionados }: DropdownProps) => {
  const handleChange = (e: any) => {
    const selectedItems = e ? e.map((item: any) => item.value) : []
    setSeleccionados(selectedItems)
  }

  return (
    <Select
      isMulti
      onChange={handleChange}
      name='colors'
      options={valores}
      className='basic-multi-select'
      classNamePrefix='select'
    />
  )
}

export default Dropdown
