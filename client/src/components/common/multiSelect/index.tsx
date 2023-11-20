import Select from 'react-select'

type DropdownProps = {
  valores: any
  setSeleccionados: (status: any) => void
  seleccionados: any[]
  label: string
}

export default function Dropdown({ valores, setSeleccionados, seleccionados, label }: DropdownProps) {
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
