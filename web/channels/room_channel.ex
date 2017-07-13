defmodule TakeItForASpin.RoomChannel do
  use Phoenix.Channel

   
  def join("room:fidget", _message, socket) do
    IO.puts "joined"
    { :ok, socket }
  end

  def join("room:*", _message, _socket) do
    {:error, %{ reason: "There's only one fidget room!" }}
  end

  def handle_in("spin", _body, socket) do
    IO.puts "Spinit"
    broadcast! socket, "spin", %{ body: 10 }
    { :noreply, socket }
  end

  def handle_out("spin", payload, socket) do
    push socket, "spin", payload
    { :noreply, socket }
  end
end