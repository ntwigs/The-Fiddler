defmodule TakeItForASpin.RoomChannel do
  use Phoenix.Channel

   
  def join("room:fidget", _message, socket) do
    { :ok, socket }
  end

  def join("room:*", _message, _socket) do
    {:error, %{ reason: "There's only one fidget room!" }}
  end

  def handle_in("spin", %{ "body" => body }, socket) do
    broadcast! socket, "spin", %{ body: body }
    { :noreply, socket }
  end

  intercept ["spin"]
  def handle_out("spin", payload, socket) do
    push socket, "spin", payload
    { :noreply, socket }
  end
end