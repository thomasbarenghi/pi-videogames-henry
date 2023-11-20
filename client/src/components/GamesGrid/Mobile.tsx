interface FiltersInnerProps {
  children?: React.ReactNode
}

const FiltersInner = ({ children }: FiltersInnerProps) => (
  <div
    className='padding-lr-t1'
    style={{
      display: 'flex',
      gap: '10px',
      flexDirection: 'column',
      width: '100%'
    }}
    id='test'
  >
    <h1 className='titulo3-bold margin-b-4' style={{ color: '#000' }}>
      Filtrar juegos
    </h1>
    <div
      style={{
        width: '100%',
        display: 'flex',
        gap: '10px',
        flexDirection: 'column'
      }}
    >
      {children}
    </div>
  </div>
)

export default FiltersInner
