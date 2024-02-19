package com.Agari.TT.domain.Trash.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class PythonScriptExecutor {

    public String executePythonScript(String image_url) {
        try {
            List<String> command = new ArrayList<>();
            command.add("python");
            // 스크립트의 경로를 지정합니다. 이 경로는 예시로, 실제 경로로 변경해야 합니다.
            command.add("./src/main/java/com/Agari/TT/domain/Trash/Service/predict_script.py");
            // 이미지 URL을 인자로 전달합니다. 필요한 경우 추가 인자를 command.add를 통해 추가할 수 있습니다.
            command.add(image_url);

            ProcessBuilder processBuilder = new ProcessBuilder(command);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder output = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                output.append(line + "\n");
            }

            int exitCode = process.waitFor();

/**
            // 에러 스트림에서 에러 메시지 읽기 ====================
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            StringBuilder errorOutput = new StringBuilder();
            String errorLine;
            while ((errorLine = errorReader.readLine()) != null) {
                errorOutput.append(errorLine + "\n");
            }
            if (exitCode != 0) {
                // 에러 메시지 출력
                System.out.println("Error Output: " + errorOutput.toString());
            }
            // ====================
 */


            if (exitCode == 0) {
                String[] result = output.toString().split(",");

                // "Predicted Label:" 뒤의 문자열 값을 추출합니다.
                String labelPrefix = "Predicted Label: ";
                String labelPrefix2 = "Probability: ";

                int startIndex = result[0].indexOf(labelPrefix);
                String trashType = result[0].substring(startIndex + labelPrefix.length()).trim();

                startIndex = result[1].indexOf(labelPrefix2);
                double probability = Double.valueOf(result[1].substring(startIndex + labelPrefix2.length()).trim());

                if (probability<0.99){
                    return null;
                }

                return trashType;

            }
            else {
                // 스크립트 실행에 실패했을 때 로그를 처리합니다.
                System.out.println("Python script execution failed");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
