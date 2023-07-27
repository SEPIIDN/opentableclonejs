export default function MainContainer(props) {
  return (
    <main className='bg-gray-100 min-h-screen w-screen'>
      <main className='max-w-screen-2xl m-auto bg-white'>
        {props.children}
      </main>
    </main>
  );
}
