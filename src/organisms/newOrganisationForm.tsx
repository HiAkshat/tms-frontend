import { useState } from "react"

interface Organisation {
  organisation_name: string;
  display_name: string;
}

export default function NewOrganisationForm() {
  const [organisation, setOrganisation] = useState<Organisation>({
    organisation_name: '',
    display_name: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(organisation)
    const res = await fetch("http://127.0.0.1:8000/api/organisation", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organisation)
    })

    if (!res.ok){
      console.log(res)
      return
    }

    console.log(res)
    // Reset form fields after submission
    setOrganisation({
      organisation_name: '',
      display_name: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrganisation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Add New Organisation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Organisation Name:</label>
          <input
            type="text"
            name="organisation_name"
            value={organisation.organisation_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Display Name:</label>
          <input
            type="text"
            name="display_name"
            value={organisation.display_name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Organisation</button>
      </form>
    </div>
  );
};