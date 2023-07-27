export default function AuthInputs({
  inputs,
  handleOnChange,
  isSignIn,
}) {
  return (
    <div>
      {isSignIn ? null : (
        <div className='my-3 flex justify-between text-sm'>
          <input
            name='firstName'
            type='text'
            className='w-[49%] border rounded p-2 py-3'
            placeholder='First Name'
            value={inputs.firstName}
            onChange={handleOnChange}
          />
          <input
            name='lastName'
            type='text'
            className='w-[49%] border rounded p-2 py-3'
            placeholder='Last Name'
            value={inputs.lastName}
            onChange={handleOnChange}
          />
        </div>
      )}
      <div className='my-3 flex justify-between text-sm'>
        <input
          name='email'
          type='text'
          className='flex-1 border rounded p-2 py-3'
          placeholder='Email'
          value={inputs.email}
          onChange={handleOnChange}
        />
      </div>
      {isSignIn ? null : (
        <div className='my-3 flex justify-between text-sm'>
          <input
            name='phone'
            type='text'
            className='w-[49%] border rounded p-2 py-3'
            placeholder='Phone'
            value={inputs.phone}
            onChange={handleOnChange}
          />
          <input
            name='city'
            type='text'
            className='w-[49%] border rounded p-2 py-3'
            placeholder='City'
            value={inputs.city}
            onChange={handleOnChange}
          />
        </div>
      )}
      <div className='my-3 flex justify-between text-sm'>
        <input
          name='password'
          type='password'
          className='flex-1 border rounded p-2 py-3'
          placeholder='Password'
          value={inputs.password}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}
