import React from "react";

/**
 * @remarks provides a general state of the client access level.
 *  Does not provide actual control authority.
 */
type clientAuthority = "anon" | "player" | "dm" | "lone";

export interface ClientState {
  player?: string;
  shops: string[];
  authority: clientAuthority;
}

export const DefaultClientState: ClientState = {
  player: undefined,
  shops: [],
  authority: "anon",
};

const ClientContext = React.createContext<ClientState>(DefaultClientState);

export default ClientContext;
