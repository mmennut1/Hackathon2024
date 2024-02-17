import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.io.DataOutputStream;
import java.net.HttpURLConnection;

public class apiUsage {

    public static void main(String[] args)
    {
        String origin = "New York City";
        String destination = "Boston";
        String key = "AIzaSyDEJFWDIyTM7RdBnz6kQdriTeTtueokEP0";
        
        //https://www.baeldung.com/java-http-request
        URL url = new URL("https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&key=" + key);
        HttpURLConnection connectURL = (HttpURLConnection) url.openConnection();
        connectURL.setRequestMethod("GET");

        Map<String, String> params = new HashMap<>();
        parames.put("param1", "val");

        connectURL.setDoOutput(true);
        DataOutputStream out = new DataOutputStream(connectURL.getOutputStream());
        out.writeBytes(paramStringBuilder.getParamsString(params));
        out.flush();
        out.close();

    }

}
