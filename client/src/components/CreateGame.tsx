'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addGame } from '@/redux/slices/client/games'
import { MultiSelect, Input, Modal, Button } from '@/components'
import { useState } from 'react'
import { toast } from 'sonner'
import { type SubmitHandler, useForm, type UseFormHandleSubmit, type FieldErrors } from 'react-hook-form'

const CreateGame = () => {
  const dispatch = useAppDispatch()
  const [visible, setVisible] = useState(false)
  const {
    formState: { errors },
    handleSubmit
  } = useForm<any>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await dispatch(addGame(data))
      toast.success('Juego creado con éxito')
    } catch (error) {
      console.error(error)
      toast.error('Verifica los campos del formulario')
    }
  }

  return (
    <>
      <Button
        text='Crear juego'
        type='button'
        onClick={() => {
          alert('Funcionalidad desactivada por seguridad')
        }}
        className='primaryButton'
      />
      <Modal visible={visible} setVisible={setVisible}>
        <Form handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} />
      </Modal>
    </>
  )
}

interface FormProps {
  handleSubmit: UseFormHandleSubmit<any, undefined>
  onSubmit: SubmitHandler<any>
  errors: FieldErrors<any>
}

const Form = ({ handleSubmit, onSubmit, errors }: FormProps) => {
  const { isErrorAdd, isLoadingAdd } = useAppSelector((state) => state?.client?.games)
  const { genres } = useAppSelector((state) => state?.client?.genres)
  const { platforms } = useAppSelector((state) => state?.client?.platforms)
  const [setSelected] = useState<any>([])
  const [setSelectedPlatforms] = useState<any>([])

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='titulo3-bold'>Creemos un juego 🚀</h1>
      {isErrorAdd ? (
        <p className='smallText-regular margin-b-24'>Algo salió mal, intenta recargar la pagina. {isErrorAdd}</p>
      ) : isLoadingAdd ? (
        <p className='smallText-regular margin-b-24'>Cargando...</p>
      ) : (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <div className='inputs-row' style={{ gap: 8 }}>
            <Input
              label='Nombre del juego'
              type='text'
              name='name'
              placeholder='Nombre del juego'
              required
              error={errors.name?.message?.toString()}
            />
            <Input
              label='Descripción del juego'
              type='textarea'
              name='description'
              placeholder='Descripción del juego'
              required
              rows={1}
              error={errors.description?.message?.toString()}
            />
          </div>
          <div className='inputs-row' style={{ gap: 8 }}>
            <Input
              label='Fecha de lanzamiento'
              type='date'
              name='released'
              placeholder='Fecha de lanzamiento'
              required
              error={errors.released?.message?.toString()}
            />
            <Input
              label='Rating'
              type='number'
              name='rating'
              placeholder='Rating'
              required
              error={errors.rating?.message?.toString()}
              step='0.1'
            />
          </div>
          <div className='inputs-row' style={{ gap: 8 }}>
            <label id='label' className='form-label smallText-regular'>
              Plataformas
              <MultiSelect
                valores={
                  platforms.map((platform) => ({
                    ...platform,
                    value: platform.id,
                    label: platform.name
                  })) as any
                }
                setSeleccionados={setSelectedPlatforms}
              />
              {errors.platforms && (
                <p className='smallText-regular' style={{ color: 'red' }}>
                  {errors.platforms?.message?.toString()}
                </p>
              )}
            </label>
            <label id='label' className='form-label smallText-regular'>
              Generos
              <MultiSelect
                valores={
                  genres.map((genre) => ({
                    ...genre,
                    value: genre.id,
                    label: genre.name
                  })) as any
                }
                setSeleccionados={setSelected}
              />
              {errors.genres && (
                <p className='smallText-regular' style={{ color: 'red' }}>
                  {errors.genres?.message?.toString()}
                </p>
              )}
            </label>
          </div>
          <div className='inputs-row' style={{ gap: 8 }}>
            <Input
              label='Link imagen'
              type='text'
              name='background_image'
              placeholder='Link imagen'
              required
              error={errors.background_image?.message?.toString()}
            />
            <Input
              label='Token'
              type='password'
              name='token'
              placeholder='Token'
              required
              error={errors.token?.message?.toString()}
            />
          </div>

          <button className='submitButton' type='submit'>
            Crear personaje
          </button>
        </form>
      )}
    </div>
  )
}

export default CreateGame
