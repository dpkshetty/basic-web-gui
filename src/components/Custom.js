import { useEffect } from "react"

const baseEndpoint = "http://ocp-ex-pyflask8-s2i-pyflask.tlcog-ocp-cluster2-ed9112eb83c761afd4c566b0882eaa3e-0000.us-east.containers.appdomain.cloud/"
const versionEndpoint = "http://ocp-ex-pyflask8-s2i-pyflask.tlcog-ocp-cluster2-ed9112eb83c761afd4c566b0882eaa3e-0000.us-east.containers.appdomain.cloud/version"
const testEndpoint = "http://ocp-ex-pyflask8-s2i-pyflask.tlcog-ocp-cluster2-ed9112eb83c761afd4c566b0882eaa3e-0000.us-east.containers.appdomain.cloud/test"

 const Custom =  () => {
    useEffect(() => {
        fetch(baseEndpoint).then(response => console.info(response) )
    }, [])
    return <div>Hello, Deepak C Shetty!</div>
}

export default Custom;