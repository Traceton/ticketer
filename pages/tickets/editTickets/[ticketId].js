
  import { useRouter } from "next/router";

export default function EditTicket(props) {
  // router object from next
  const router = useRouter();

  const ticketId = router.query.ticketId;

  const updateTicket = async (event) => {
    event.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/tickets/${ticketId}`, {
      body: JSON.stringify({
         title: event.target.title.value, description: event.target.description.value, author: event.target.author.value, state: event.target.state.value
      }),
      headers: {
        "User-Agent": "*",
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });

    router.push(`/tickets/${ticketId}`)

  };

  const deleteTicket = async (event) => {
    event.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/tickets/${ticketId}`, {

      headers: {
        "User-Agent": "*",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    router.push(`/tickets`)

  }

  return (
    <div className="bg-gray-700 h-screen">
      <div className="p-2">
        <div className=" m-4 p-4 rounded-md bg-gray-400 font-light space-y-8 ">
          <form onSubmit={updateTicket}>
            <div>
              <h3 className="text-4xl leading-6 font-light text-gray-900">Edit Ticket</h3>
            </div>

            <div className="text-xl mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
        <label htmlFor="title" className="block text-3xl font-light text-gray-700">
          title
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
          defaultValue={props.ticket.title}
            type="text"
            name="title"
            id="title"
            autoComplete="title"
            className="shadow-sm  border border-transparent block h-10 w-full text-xl font-light sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
      </div><div className="sm:col-span-6">
        <label htmlFor="description" className="block text-3xl font-light text-gray-700">
          description
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
          defaultValue={props.ticket.description}
            type="text"
            name="description"
            id="description"
            autoComplete="description"
            className="shadow-sm  border border-transparent block h-10 w-full text-xl font-light sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
      </div><div className="sm:col-span-6">
        <label htmlFor="author" className="block text-3xl font-light text-gray-700">
          author
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
          defaultValue={props.ticket.author}
            type="text"
            name="author"
            id="author"
            autoComplete="author"
            className="shadow-sm  border border-transparent block h-10 w-full text-xl font-light sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
      </div><div className="sm:col-span-6">
        <label htmlFor="state" className="block text-3xl font-light text-gray-700">
          state
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
          defaultValue={props.ticket.state}
            type="text"
            name="state"
            id="state"
            autoComplete="state"
            className="shadow-sm  border border-transparent block h-10 w-full text-xl font-light sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
      </div>
              <div className="m-2 p-2 w-full">
                <div className="  flex justify-start">
                  <button
                    onClick={() => router.back()}
                    type="button"
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={deleteTicket}
                    type="button"
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-light rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  // fetch ticket data from api here
  const ticketId = context.params.ticketId;
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/tickets/${ticketId}`, {
    headers: {
      "User-Agent": "*",
      Accept: "application/json; charset=UTF-8",
    },
    method: "GET"
  });

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ticket: data.ticket,
    },
  };
};



  