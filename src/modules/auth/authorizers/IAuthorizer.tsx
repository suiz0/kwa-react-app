interface IAuthorizer {
    authorize(): Promise<any>
}

export default IAuthorizer