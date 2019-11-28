DELIMITER |

DROP EVENT `price_minute_insert`;
CREATE DEFINER=`root`@`localhost` EVENT `price_minute_insert` ON SCHEDULE EVERY 1 MINUTE STARTS '2019-01-01 00:00:00' ON COMPLETION PRESERVE ENABLE DO BEGIN
	SET @numberOfPairs = (SELECT count(*) from Pair);
    SET @i = 1;
    WHILE @i <= @numberOfPairs DO
    	SET @low = (SELECT min(price) from PriceTick WHERE createdAt > NOW() - INTERVAL 1 MINUTE AND createdAt < NOW() AND pairId=@i);
        SET @high = (SELECT max(price) from PriceTick WHERE createdAt > NOW() - INTERVAL 1 MINUTE AND createdAt < NOW() AND pairId=@i);
        SET @open = (SELECT price FROM PriceTick WHERE createdAt > NOW() - INTERVAL 1 MINUTE AND pairId=@i ORDER BY id ASC LIMIT 1);
        SET @close = (SELECT price FROM PriceTick WHERE createdAt > NOW() - INTERVAL 1 MINUTE AND pairId=@i ORDER BY id DESC LIMIT 1);
        SET @volume = (SELECT sum(volume) FROM PriceTick WHERE createdAt > NOW() - INTERVAL 1 MINUTE AND pairId=@i AND createdAt < NOW());
        IF @low IS NOT NULL AND @high IS NOT NULL AND @open IS NOT NULL AND @close IS NOT NULL AND @volume IS NOT NULL THEN
		    INSERT INTO PriceMinute(open, close, low, high, pairId, volume, createdAt, updatedAt) VALUES (@open, @close, @low, @high, @i, @volume, NOW(), NOW());
        END IF;
       	SET @i = @i + 1;
    end WHILE;
END

END |

DELIMITER |

DROP EVENT `price_day_insert`;
CREATE DEFINER=`root`@`localhost` EVENT `price_day_insert` ON SCHEDULE EVERY 1 DAY STARTS '2019-01-01 00:00:00' ON COMPLETION PRESERVE ENABLE DO BEGIN
	SET @numberOfPairs = (SELECT count(*) from Pair);
    SET @i = 1;
    WHILE @i <= @numberOfPairs DO
    	SET @low = (SELECT min(low) from PriceMinute WHERE createdAt > NOW() - INTERVAL 1 DAY AND createdAt < NOW() AND pairId=@i);
        SET @high = (SELECT max(high) from PriceMinute WHERE createdAt > NOW() - INTERVAL 1 DAY AND createdAt < NOW() AND pairId=@i);
        SET @open = (SELECT open FROM PriceMinute WHERE createdAt > NOW() - INTERVAL 1 DAY AND pairId=@i ORDER BY id ASC LIMIT 1);
        SET @close = (SELECT close FROM PriceMinute WHERE createdAt > NOW() - INTERVAL 1 MINUTE AND pairId=@i ORDER BY id DESC LIMIT 1);
        SET @volume = (SELECT sum(volume) FROM PriceMinute WHERE createdAt > NOW() - INTERVAL 1 DAY AND pairId=@i AND createdAt < NOW());
        IF @low IS NOT NULL AND @high IS NOT NULL AND @open IS NOT NULL AND @close IS NOT NULL AND @volume IS NOT NULL THEN
		    INSERT INTO PriceDay(open, close, low, high, pairId, volume, createdAt, updatedAt) VALUES (@open, @close, @low, @high, @i, @volume, NOW(), NOW());
        END IF;
       	SET @i = @i + 1;
    end WHILE;
END

END |
