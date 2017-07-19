defmodule TakeItForASpin.PageController do
  use TakeItForASpin.Web, :controller

  def index(conn, _params) do
    render conn, "fidgetspinner.html"
  end
end
