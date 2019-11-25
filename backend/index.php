<?php

if (!isset($_REQUEST['data'])) {
  http_response_code(403);
  header('Location: //netbiblio.ru/404.html');
  exit();
}

$response['status'] = 'Назначение запроса не определено.';
$data = json_decode($_REQUEST['data'], true);

if (isset($data['answer']) && $data['answer'] !== '1997') {
  $response['status'] = 'Ошибка отправки сообщения. Попробуйте ещё раз.';
} else {
  require('../../env.php');
  $db_link = mysqli_connect('localhost', 'root', $_ENV['DB_PASS'], 'netbiblio');

  $db_data = [
    trim($data['page']),
    trim($data['name']),
    trim($data['email']),
    mysqli_real_escape_string($db_link, trim($data['message'])),
    $_SERVER['HTTP_USER_AGENT']
  ];

  $query = 'INSERT INTO tickets (page, name, email, message, browser) VALUES ("' . implode('", "', $db_data). '")';
  if (mysqli_query($db_link, $query)) {
    $response['status'] = '<p>Спасибо за помощь! Фрагмент передан дежурному редактору «Netbiblio».</p><p>Если отзыв содержателен, мы обязательно опубликуем его! Если текст действительно содержит указанную ошибку, мы исправим её в ближайшее время.</p>';
  }
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
exit(json_encode($response, JSON_UNESCAPED_UNICODE));
