defmodule TakeItForASpin.Speed do
  @time 500

  def start_link do
    rep
  end

  def rep do
    speed = TakeItForASpin.State.decrease_speed
    TakeItForASpin.Endpoint.broadcast! "room:fidget", "update", %{ body: speed }
    :timer.sleep @time
    rep
  end
end