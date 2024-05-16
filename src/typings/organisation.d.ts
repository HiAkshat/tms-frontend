type SendOrganisationType = {
  organisation_name: string,
  display_name: string,
}

type OrganisationType = {
  _id: string,
  unique_id?: string,
  organisation_name: string,
  display_name: string,
  total_tickets?: number
}
